import async from "async"
import path from "path"

import layoutPresenter from "tisko-layout"
import ReactComponent from "./react_server"
import viewCustomerOrder from "../database/api/view_customer_order"
import { validateOrderDat, validateCustomerLinkData } from "./presenters/form_validator"

let debug = require("debug")('Modules:Order:Controller')

const controller = ({modules}) => {
  const { pugCompiler, logger, jsAsset, cssAsset, queryDb, Mailer } = modules
  const srcPath = path.join(__dirname, '../', '../', 'customer_main')
  const renderHTML = pugCompiler(srcPath)
  const title = 'Tisko - My Order'
  const localModule = { logger, queryDb }
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
      const orderData = [userid, formData.orderId]

      async.waterfall(
        [
          (done) => {
            viewCustomerOrder(orderData, {logger, queryDb}, (err, orderResult) => {
              done(err, orderResult)
            })
          },
          (orderResult, done) => {
            ReactComponent({location, orderResult}, localModule, (err, reactHTML, preloadedState) => {
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
                stylesheet: cssAsset('ordercss'),
                body_class: 'customer-order',
                title,
                reactHTML,
                preloadedState
              })

              responders.html(renderHTML(page))
            })
          }
        ], (err) => {
          logger.info('ERROR in viewOrderAsCustomer')
        }
      )
    }
  }
}

export default controller
