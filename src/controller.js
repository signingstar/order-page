import async from "async"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import { createOrder, processOrder, confirmOrder, viewOrderAsCustomer } from "./presenters/api_executor"
import { addAlbum } from "./request_builders/add_album"

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
  const srcPath = path.join(__dirname, '../', 'main')
  const renderHTML = pugCompiler(srcPath)
  const title = 'Tisko - Place an Order'
  const localModule = { logger, queryDb, redisClient }
  const isSecured = true

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

      createOrder({formData, session}, {logger, queryDb }, ({err, orderData, result}) => {
        if(err) {
          return responders.json(null, err, err.statusCode || 500)
        }
        const {order_id} = result
        orderData.id = order_id

        addAlbum({order_id}, {redisClient}, (err, result) => {
          if(err) return res.status(500).end()
          const { album_id: id, album_name: name, priority } = result
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
            if(body[album.album_id]) album.album_name = body[album.album_id]
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

      async.waterfall(
        [
          (done) => {
            confirmOrder({params, body, session, location}, {logger, queryDb }, ({err, orderData, result}) => {
              done(err, {orderId: orderData.order_id})
            })
          },
          (order, done) => {
            const {orderId} = order
            redisClient.hset(`order_id_${orderId}`, ['status', 'confirmed'])
            redisClient.hgetall(`order_id_${orderId}`, (err, orderData) => {
              done(null, orderData, session.user)
            })
          },
          (orderData, userData, done) => {
            const mailOptions = {
              to: orderData.email,
              cc: userData.email,
              from: 'verify@tisko.com',
              subject: 'Tisko Order Creation',
              text: 'You are receiving this because Anil has created request on behalf of you.\n\n' +
                        'Please click on the following link, or paste this into your browser to view the details:\n\n' +
                        `http://${req.headers.host}/order/random_string/${orderData.id}` + '\n\n' +
                        'If you did not request this, please ignore this email and chill out :D.\n'
            }

            Mailer(mailOptions)((err, info) => {
              if(err) {
                req.flash('An error occured whie sending the reset email')
              } else {
                req.flash('info', 'An e-mail has been sent to ' + 'me' + ' with further instructions.')
              }
              res.status(200).end()
            })
          }
        ],
        (err) => {
          res.status(500).end()
        }
      )
    },

    addAlbum: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { order_id } = body
      addAlbum({order_id}, {redisClient}, (err, result) => {
        if(err) return res.status(500).end()
        responders.json(result)
      })
    },

    viewOwner: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session } = req
      const orderId = req.params.orderid

      const user = getUserObject(session, responders, true)
      if (!user) return

    },
  }
}

export default controller
