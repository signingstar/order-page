import async from "async"
import auto from "async/auto"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import ReactPreviewComponent from "./react_server_preview"
import { viewCustomerOrder } from "../database/api/view_order"
import { addUser, updateUser } from "../database/api/db_updates"
import { validateOrderData, validateCustomerLinkData } from "./presenters/form_validator"
import requestBuilder from "../request_builders"
import { finalizeCustomerOrder } from "./presenters/api_executor"

let debug = require("debug")('Modules:Order:Controller')

const controller = ({modules}) => {
  const { pugCompiler, logger, jsAsset, cssAsset, queryDb, Mailer, redisClient } = modules
  const srcPath = path.join(__dirname, '../', '../', 'customer_main')
  const renderHTML = pugCompiler(srcPath)
  const title = 'Tisko - My Order'
  const localModule = { logger, queryDb, redisClient }
  const isSecured = true
  const RequestBuilder = requestBuilder({redisClient, queryDb, logger})

  const getUserObject = (session, responders, ajax, location) => {
    const {user} = session

    if(!user || !user.id) {
      if(ajax) {
        return responders.json(null, {message: 'Session Timed out'}, 401 )
      }
      return responders.redirectForAuthentication(location, "authenticate", logger)
    }

    return user
  }

  return {
    viewCustomer: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, params, url: location} = req
      const orderId = params.orderId
      const image_id = params.image_id === 'finalize' || params.image_id === 'adduser' ? undefined: params.image_id

      const user = getUserObject(session, responders, false, location)
      if (!user) return

      layoutPresenter({user, topNav: false}, page, {jsAsset})

      const { err, formData } = validateCustomerLinkData({orderId})
      if(err) {
        responders.json(err, {message: 'Bad Input'}, 400 )
        return
      }

      const user_id = user.id
      const order_id = formData.orderId
      const orderQueryData = {user_id, order_id, email: user.email}

      const { fetchOrderForCustomer, getAlbums, getImages, getImageReactions, getRawImages, products, categories } = RequestBuilder

      auto({
        orderResult: (cb) => fetchOrderForCustomer(orderQueryData, cb),
        imageReaction: ['orderResult', (results, cb) => getImageReactions({order_id, image_id, user_id, files: results.orderResult.imagefiles}, cb)],
        handle_redirect: ['orderResult', 'imageReaction', (results, cb) => {
          const { orderResult } = results

          if(!orderResult.productid) {
            return responders.redirectWithoutCookies(`/orders/${order_id}`, logger, '[Incorrect Portal]')
          }
          cb()
        }],
        products: (cb) => products(cb),
        categories: (cb) => categories(cb),
        reactHandler: ['handle_redirect', 'products', 'categories', 'imageReaction', (results, cb) => ReactComponent(location, results, cb)],
        renderUI: ['reactHandler', (results, cb) => {
          const {reactHTML, preloadedState} = results.reactHandler

          page.set( {
            javascript: jsAsset('customerjs'),
            stylesheet: cssAsset('customercss'),
            body_class: 'customer-order',
            title,
            reactHTML,
            preloadedState
          })

          responders.html(renderHTML(page))
          cb()
        }]
      }, (err, results)=> {
        if(err) {
          if(err.reason === 'redirect') {
            res.writeHead(301, {
              Location: result.redirect.pathname
            })
            res.end()
          } else if(err.reason === 'missed') {
            res.status(404).end()
          } else {
            res.status(500).end()
          }
        } else {
          logger.info(`response successfully emitted for user`)
        }
      })
    },

    viewPreview: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params: {orderid, image_id}, url: location} = req

      layoutPresenter({undefined, topNav: false}, page, {jsAsset})

      // TODO: Remove hard coded user id
      const orderQueryData = ['3011b393-e9bf-4177-b50a-7a25fc4a64d2', orderid, 'abc']

      const { fetchOrderForCustomer, getAlbums, getImages } = RequestBuilder

      auto({
        orderResult: (cb) => fetchOrderForCustomer(orderQueryData, cb),
        albums: (cb) => getAlbums(orderid, cb),
        images: (cb) => getImages(orderid, cb),
        render_ui: ['orderResult', 'albums', 'images', (results, cb) => {
          const { orderResult, albums, images } = results

          orderResult.id = orderid
          ReactPreviewComponent(location, results, localModule, (err, reactHTML, preloadedState) => {
            page.set( {
              javascript: jsAsset('preview'),
              stylesheet: cssAsset('customercss'),
              body_class: 'customer-order',
              title,
              reactHTML,
              preloadedState
            })

            responders.html(renderHTML(page))
          })
        }]
      }, (err, results)=> {
        logger.info(`err`, err)
      })
    },

    customerFeedback: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, body } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { reaction_type: reaction, image_uuid: image_id, order_id, index } = body
      const { setImageReaction } = RequestBuilder

      setImageReaction({order_id, user, reaction, image_id})
      res.status(200).end()
    },

    getReaction: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, query } = req
      const { order_id } = query

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { getImages, getImageReactions } = RequestBuilder

      async.waterfall(
        [
          (done) => getImages(order_id, done),
          (files, done) => getImageReactions({order_id, undefined, user_id: user.id, files}, (err, res) => done(null, res)),
          (filesMap, done) => {
            responders.json(filesMap)
          }
        ],
        (err) => {
          logger.error('Error while fetching data')
          res.status(500).end()
        }
      )
    },

    addUser: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, body } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { emailid, role, order_id } = body

      addUser([emailid, `{"active": true, "role": ${role}}`, order_id, user.id], {queryDb, logger}, (err, result) => {
        if(err) return res.status(500).end()
        res.status(200).end()
      })
    },

    deactivateUser: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, body } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { emailid, order_id } = body

      //TODO
      addUser([emailid, `{"active": false, "role": 1}`, order_id, user.id], {queryDb, logger}, (err, result) => {
        if(err) return res.status(500).end()
        res.status(200).end()
      })
    },

    qualifyImage: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, body } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      const { image_id, order_id, reaction } = body
      const { forceQualifyImage } = RequestBuilder

      forceQualifyImage({order_id, user, reaction, image_id}, (err, result) => {
        if(err) return res.status(500).end()
        res.status(200).end()
      })
    },

    fetchImagesByUser: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, body } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      // handle duplicate user names
      const { user_name, order_id } = body
      const { fetchImagesByUser } = RequestBuilder

      fetchImagesByUser({order_id, user, reaction, image_id}, (err, result) => {
        if(err) return res.status(500).end()
        res.status(200).end()
      })
    },

    finalizeOrderByCustomer: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params, body, session, url: location } = req

      const user = getUserObject(session, responders, true)
      if (!user) return

      finalizeCustomerOrder({params, body, userId: user.id}, {logger, queryDb }, ({err, orderData, result}) => {
        if(err) {
          return responders.json(null, err, err.statusCode || 500)
        }

        const { order_id } = orderData

        redisClient.hget(`order_id_${order_id}`, 'albums', (err, res) => {
          if(err) return responder.json(err)

          redisClient.hmset(`order_id_${order_id}`, ['status', 'finalized'])
        })

        responders.json(result)
      })
    }
  }
}

export default controller
