import async from "async"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import viewCustomerOrder from "../database/api/view_customer_order"
import { validateOrderDat, validateCustomerLinkData } from "./presenters/form_validator"

let debug = require("debug")('Modules:Order:Controller')

const controller = ({modules}) => {
  const { pugCompiler, logger, jsAsset, cssAsset, queryDb, Mailer, redisClient } = modules
  const srcPath = path.join(__dirname, '../', '../', 'customer_main')
  const renderHTML = pugCompiler(srcPath)
  const title = 'Tisko - My Order'
  const localModule = { logger, queryDb, redisClient }
  const isSecured = true

  return {
    viewCustomer: ({attributes, responders, page}) => {
      const { req, res } = attributes
      const { session, params: {orderId}, url: location} = req

      const {isLogged = false} = layoutPresenter({session, topNav: false}, page, {jsAsset})
      const {user} = session

      if(!user || !user.id) {
        responders.redirectForAuthentication(location, "authenticate", logger)
        return
      }

      const { err, formData } = validateCustomerLinkData({orderId})
      if(err) {
        responders.json(err, {message: 'Bad Input'}, 400 )
        return
      }

      const userid = user.id
      const orderid = formData.orderId
      const orderQueryData = [userid, orderid]

      async.waterfall(
        [
          (done) => {
            async.parallel(
              {
                orderResult: (cb) => {
                  viewCustomerOrder(orderQueryData, localModule, (err, orderResult) => {
                    orderResult.id = orderid

                    cb(err, orderResult)
                  })
                },
                images: (cb) => {
                  redisClient.zrange(`order_id_${orderid}:files`, [0, -1], (err, res) => {
                    cb(err, res)
                  })
                }
              },
              (err, results) => done(err, results)
            )
          },
          (results, done) => {
            const {orderResult, images} = results
            if(!orderResult.productid) {
              return responders.redirectWithoutCookies(`/myorder/${orderid}`, logger, '[Incorrect Portal]')
            }
            ReactComponent({location, orderResult, images}, localModule, (err, reactHTML, preloadedState) => {
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
    }
  }
}

export default controller
