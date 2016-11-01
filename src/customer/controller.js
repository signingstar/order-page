import async from "async"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import ReactPreviewComponent from "./react_server_preview"
import { viewCustomerOrder } from "../database/api/view_order"
import { addUser, updateUser } from "../database/api/db_updates"
import { validateOrderData, validateCustomerLinkData } from "./presenters/form_validator"
import requestBuilder from "../request_builders"

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
      const { session, params: {orderId, image_id}, url: location} = req

      const user = getUserObject(session, responders, false, location)
      if (!user) return

      layoutPresenter({user, topNav: false}, page, {jsAsset})

      const { err, formData } = validateCustomerLinkData({orderId})
      if(err) {
        responders.json(err, {message: 'Bad Input'}, 400 )
        return
      }

      const userid = user.id
      const order_id = formData.orderId
      const orderQueryData = [userid, order_id, user.email]

      const { fetchOrderForCustomer, getAlbums, getImages, getImageReactions, getRawImages } = RequestBuilder

      async.waterfall(
        [
          (done) => {
            async.parallel(
              {
                orderResult: (cb) => fetchOrderForCustomer(orderQueryData, cb),
                albums: (cb) => getAlbums(order_id, cb),
                images: (cb) => getRawImages(order_id, cb),
                imageReaction: (cb) => getImageReactions({order_id, image_id, user_id: userid}, cb)
              },
              (err, results) => done(err, results)
            )
          },
          (results, done) => {
            const {orderResult, images, albums, imageReaction} = results

            orderResult.id = order_id
            if(!orderResult.productid) {
              return responders.redirectWithoutCookies(`/myorder/${orderid}`, logger, '[Incorrect Portal]')
            }
            ReactComponent(location, results, localModule, (err, reactHTML, preloadedState) => {
              if(err) {
                if(err.reason === 'redirect') {
                  res.writeHead(301, {
                    Location: result.redirect.pathname
                  })
                  res.end()
                } else if(err.reason === 'missed') {
                  res.status(404).end()
                }
              }
              page.set( {
                javascript: jsAsset('customerjs'),
                stylesheet: cssAsset('customercss'),
                body_class: 'customer-order',
                title,
                reactHTML,
                preloadedState
              })

              responders.html(renderHTML(page))
            })
          }
        ], (err) => {
          logger.error('ERROR in viewOrderAsCustomer' + err)
          return res.status(500).end()
        }
      )
    },

    viewPreview: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { params: {orderid, image_id}, url: location} = req

      layoutPresenter({undefined, topNav: false}, page, {jsAsset})

      // TODO: Remove hard coded user id
      const orderQueryData = ['3011b393-e9bf-4177-b50a-7a25fc4a64d2', orderid, 'abc']

      const { fetchOrderForCustomer, getAlbums, getImages } = RequestBuilder

      async.waterfall(
        [
          (done) => {
            async.parallel(
              {
                orderResult: (cb) => fetchOrderForCustomer(orderQueryData, cb),
                albums: (cb) => getAlbums(orderid, cb),
                images: (cb) => getImages(orderid, cb)
              },
              (err, results) => done(err, results)
            )
          },
          (results, done) => {
            const {orderResult, images, albums} = results

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
          }
        ], (err) => {
          logger.error('ERROR in viewOrderAsCustomer' + err)
          return res.status(500).end()
        }
      )
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
          (files, done) => {
            let filesReactionMap = {}

            files.forEach((file, index) => {
              const { id, album_id } = file
              getImageReactions({order_id, image_id: id, user_id: user.id, album_id}, (err, res) => {
                if(err) return done(err)

                if(res && res !== null) {
                  filesReactionMap[id] = res[id]
                }

                if(index === files.length -1 ) {
                  return done(null, filesReactionMap)
                }
              })
            })
          },
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
    }

  }
}

export default controller
