import async from "async"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import ReactPreviewComponent from "./react_server_preview"
import { viewCustomerOrder } from "../database/api/view_order"
import { addUser, updateUser } from "../database/api/db_updates"
import { validateOrderDat, validateCustomerLinkData } from "./presenters/form_validator"
import { LIKES, LIKED } from "./frontend/actions"
import requestBuilder from "./request_builders"

let debug = require("debug")('Modules:Order:Controller')

const getUserObject = (session, responders, ajax, logger, location) => {
  const {user} = session

  if(!user || !user.id) {
    if(ajax) {
      return responders.json(null, {message: 'Session Timed out'}, 401 )
    }
    return responders.redirectForAuthentication(location, "authenticate", logger)
  }

  return user
}

const controller = ({modules}) => {
  const { pugCompiler, logger, jsAsset, cssAsset, queryDb, Mailer, redisClient } = modules
  const srcPath = path.join(__dirname, '../', '../', 'customer_main')
  const renderHTML = pugCompiler(srcPath)
  const title = 'Tisko - My Order'
  const localModule = { logger, queryDb, redisClient }
  const isSecured = true
  const RequestBuilder = requestBuilder({redisClient, queryDb, logger})

  return {
    viewCustomer: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, params: {orderId, image_id}, url: location} = req

      const user = getUserObject(session, responders, false, logger, location)
      if (!user) return

      layoutPresenter({user, topNav: false}, page, {jsAsset})

      const { err, formData } = validateCustomerLinkData({orderId})
      if(err) {
        responders.json(err, {message: 'Bad Input'}, 400 )
        return
      }

      const userid = user.id
      const orderid = formData.orderId
      const orderQueryData = [userid, orderid, user.email]

      const { fetchOrderForCustomer, albums, images, imageReactions } = RequestBuilder

      async.waterfall(
        [
          (done) => {
            async.parallel(
              {
                orderResult: (cb) => fetchOrderForCustomer(orderQueryData, cb),
                albums: (cb) => albums(orderid, cb),
                images: (cb) => images(orderid, cb),
                imageReaction: (cb) => imageReactions({orderid, image_id}, cb)
              },
              (err, results) => done(err, results)
            )
          },
          (results, done) => {
            const {orderResult, images, albums, imageReaction} = results

            orderResult.id = orderid
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

      const orderQueryData = ['3011b393-e9bf-4177-b50a-7a25fc4a64d2', orderid, 'abc']

      const { fetchOrderForCustomer, albums, images, imageReactions } = RequestBuilder

      async.waterfall(
        [
          (done) => {
            async.parallel(
              {
                orderResult: (cb) => fetchOrderForCustomer(orderQueryData, cb),
                albums: (cb) => albums(orderid, cb),
                images: (cb) => images(orderid, cb)
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

      const { reaction_type, image_uuid, order_id, index } = body

      const fileToUserMap = {
        user_name: user.first_name,
        reaction: reaction_type
      }

      redisClient.hset(`order_id_${order_id}:files:${image_uuid}`, [user.id, JSON.stringify(fileToUserMap)])

      const userToFileMap = {
        image_id: image_uuid,
        reaction: reaction_type
      }

      redisClient.zadd([`order_id_${order_id}:users:${user.id}`, +(new Date()), JSON.stringify(userToFileMap)])
      res.status(200).end()
    },

    getReaction: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, query } = req
      const { order_id } = query

      const user = getUserObject(session, responders, true)
      if (!user) return

      async.waterfall(
        [
          (done) => {
            redisClient.zrange(`order_id_${order_id}:files`, [0, 10], (err, res) => {
              done(err, res)
            })
          },
          (files, done) => {
            let filesReactionMap = {}

            files.forEach((file, index) => {
              const fileObj = JSON.parse(file)
              const { id, album_id } = fileObj
              redisClient.hgetall(`order_id_${order_id}:files:${id}`, (err, res) => {
                if(!err) {
                  if(res && res !== null) {
                    filesReactionMap[fileObj.id] = parseReactions(res, user.id, album_id)
                  }

                  if(index === files.length -1 ) {
                    return done(null, filesReactionMap)
                  }
                } else {
                  return done(err)
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

      addUser([emailid, `{"active": false, "role": 1}`, order_id, user.id], {queryDb, logger}, (err, result) => {
        if(err) return res.status(500).end()
        res.status(200).end()
      })
    }

  }
}

const parseReactions = (obj, userId, albumId) => {
  if(!obj) {
    return
  }

  let reactionObj = {likes: false, liked: [], albumId}

  for(let index in obj) {
    const jsonObj = JSON.parse(obj[index])

    if(index === userId) {
      reactionObj[LIKES] = +jsonObj.reaction
    } else {
      reactionObj[LIKED].push({name: jsonObj.user_name, reaction_type: jsonObj.reaction})
    }
  }

  return reactionObj
}

export default controller
