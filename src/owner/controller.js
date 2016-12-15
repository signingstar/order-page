import waterfall from "async/waterfall"
import parallel from "async/parallel"
import auto from "async/auto"

import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import ReactComponentView from "./react_server_view"
import { viewOwnerOrders } from "../database/api/view_order"
import { createOrder, processOrder, confirmOrder, viewOrderAsCustomer } from "./presenters/api_executor"
import requestBuilder from "../request_builders"


let debug = require("debug")('Modules:Order:Controller')

const getUserObject = (session, responders, ajax, logger, location) => {
  const {user} = session

  if(!user || !user.id) {
    if(ajax) {
      return responders.json(null, {message: 'Sesstion Timed out'}, 401 )
    }
    return responders.redirectForAuthentication(location, "authenticate", logger)
  }

  return user
}

const controller = ({modules}) => {
  const { pugCompiler, logger, jsAsset, cssAsset, queryDb, Mailer, redisClient } = modules
  const srcPath = path.join(__dirname, '../', '../', 'main')
  const renderHTML = pugCompiler(srcPath)
  const title = 'Tisko - Place an Order'
  const localModule = { logger, queryDb, redisClient }
  const isSecured = true
  const RequestBuilder = requestBuilder({redisClient, queryDb, logger})

  return {
    main: ({attributes, responders, page}) => {
      const {req, res} = attributes;
      const {session, url: location} = req;

      const user = getUserObject(session, responders, false, logger, location)
      if (!user) return

      layoutPresenter({user, topNav: false}, page, {jsAsset})
      const userid = user.id

      ReactComponent({location,userid}, localModule, (err, reactHTML, preloadedState) => {
        if(err) {
          if(err.reason === 'redirect') {
            res.writeHead(302, {
              Location: err.location
            })

            return res.end()
          } else if(err.reason === 'missed') {
            res.status(404)
          } else if(err.reason === 'order_not_found') {
            res.redirect('/')
          }
        }

        page.set( {
          javascript: jsAsset('orderjs'),
          stylesheet: cssAsset('ordercss'),
          body_class: 'order',
          title,
          reactHTML,
          preloadedState
        })

        responders.html(renderHTML(page))
      })
    },

    create: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { body, session } = req
      const formData = Object.assign({}, body)

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { addAlbum } = RequestBuilder

      createOrder({formData, session}, {logger, queryDb }, ({err, orderData, result}) => {
        if(err) {
          return responders.json(null, err, err.statusCode || 500)
        }
        const {order_id} = result
        orderData.id = order_id

        addAlbum({order_id}, (err, result) => {
          if(err) return res.status(500).end()
          const { id, name, priority } = result
          // Send response first. Redis update can happen thereafter
          responders.json({order_id, id, name, priority})
          redisClient.hmset(`order_id_${order_id}`, orderData)
        })
      })
    },

    process: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      processOrder({params, body, session, location}, {logger, queryDb }, ({err, orderData, result}) => {
        if(err) {
          return responders.json(null, err, err.statusCode || 500)
        }

        const { order_id } = orderData

        redisClient.hget(`order_id_${order_id}`, 'albums', (err, res) => {
          if(err) return responder.json(err)
          const albums = JSON.parse(res)
          albums.forEach(album => {
            if(body[album.id]) album.name = body[album.id]
          })

          redisClient.hmset(`order_id_${order_id}`, ['albums', JSON.stringify(albums), 'status', 'in_process'])
        })

        responders.json(result)
      })
    },

    confirm: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { order_id, order_name = null, category = 'wedding'} = body
      const { getOrderInfo, getImages, persistOrder } = RequestBuilder

      auto({
        order_info: (cb) => getOrderInfo({order_id}, cb),
        images: (cb) => getImages(order_id, cb),
        persist_order: ['order_info', 'images', (results, cb) => persistOrder(Object.assign(results, {order_name, category, userId: user.id}), cb)],
        send_mail: ['persist_order', ({order_info}, cb)  => {
          const {email, id} = order_info
          const userData = session.user
          const mailOptions = {
            to: email,
            cc: user.email,
            from: 'verify@tisko.com',
            subject: 'Tisko Order Creation',
            text: 'You are receiving this because Anil has created request on behalf of you.\n\n' +
                      'Please click on the following link, or paste this into your browser to view the details:\n\n' +
                      `http://${req.headers.host}/order/random_string/${id}` + '\n\n' +
                      'If you did not request this, please ignore this email and chill out :D.\n'
          }

          Mailer(mailOptions)((err, info) => {
            if(err) {
              req.flash('An error occured whie sending the reset email')
            } else {
              req.flash('info', 'An e-mail has been sent to ' + 'me' + ' with further instructions.')
            }
            cb()
            res.status(200).end()
          })
        }]
      },
      (err, results) => {
        res.status(200).end()
      })
    },

    addAlbum: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { order_id } = body

      const { addAlbum } = RequestBuilder

      addAlbum({order_id}, (err, result) => {
        if(err) return res.status(500).end()
        responders.json(result)
      })
    },

    updateAlbum: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { order_id, mapping, album_id, action } = body

      if((action && !album_id) || (!action  && (!mapping || !Object.keys(mapping)))) {
        res.status(400).end()
      }

      const { updateAlbum, removeAlbum } = RequestBuilder

      if(action === '-1') {
        removeAlbum({order_id, album_id}, (err, result) => {
          if(err) return res.status(500).end()
          responders.json(result)
        })
      } else {
        updateAlbum({order_id, mapping}, (err, result) => {
          if(err) return res.status(500).end()
          responders.json(result)
        })
      }
    },

    deleteFile: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { order_id, album_id, filename } = body

      if(!order_id || !filename || !album_id) {
        res.status(400).end()
      }

      const { searchAndRemoveFile } = RequestBuilder

      searchAndRemoveFile({order_id, album_id, filename}, (err, result) => {
        if(err) return res.status(500).end()
        responders.json(result)
      })
    },

    // To Get the list of orders
    viewOrders: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      viewOwnerOrders([user.id], localModule, (err, orderResults) => {
        if(err) res.status(500).end()

        responders.json(orderResults)
      })
    },

    // This will be order detail page
    viewOrder: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, url: location } = req
      const {orderid} = req.params

      const user = getUserObject(session, responders, true)
      if (!user) return

      layoutPresenter({user, topNav: false}, page, {jsAsset})
      const userid = user.id

      ReactComponentView({location, userid, orderid}, localModule, (err, reactHTML, preloadedState) => {
        if(err) {
          if(err.reason === 'redirect') {
            res.writeHead(302, {
              Location: err.location
            })

            return res.end()
          } else if(err.reason === 'missed') {
            res.status(404)
          }
        }

        page.set( {
          javascript: jsAsset('orderjs'),
          stylesheet: cssAsset('ordercss'),
          body_class: 'order',
          title,
          reactHTML,
          preloadedState
        })

        responders.html(renderHTML(page))
      })
    }
  }
}

export default controller
