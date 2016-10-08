import async from "async"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import { createOrder, processOrder, confirmOrder, viewOrderAsCustomer } from "./presenters/api_executor"

let debug = require("debug")('Modules:Order:Controller')

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

      const {isLogged = false} = layoutPresenter({session, topNav: false}, page, {jsAsset})

      if(isSecured && !isLogged) {
        responders.redirectForAuthentication(location, "authenticate", logger)
        return
      }

      const userid = session.user.id

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
      const { params, body, session, url: location } = req
      const formData = Object.assign({}, body)

      createOrder({formData, session}, {logger, queryDb }, ({err, orderData, result}) => {
        if(err) {
          return responders.json(null, err, err.statusCode || 500)
        }
        const {order_id} = result

        responders.json(result)
        redisClient.hmset(`order_id_${order_id}`, orderData)
        redisClient.hmset(`order_id_${order_id}`, ['id', order_id])
      })
    },

    process: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      processOrder({params, body, session, location}, {logger, queryDb }, ({err, orderData, result}) => {
        if(err) {
          return responders.json(null, err, err.statusCode || 500)
        }

        // redisClient.hgetall(`order_id_${orderData.order_id}`, (err, obj) => {
        //   console.dir(obj)
        // })

        responders.json(result)
        redisClient.hset(`order_id_${orderData.order_id}`, ['status', 'in_process'])
      })
    },

    confirm: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req
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

    viewOwner: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const orderId = req.params.orderid
    },
  }
}

export default controller
