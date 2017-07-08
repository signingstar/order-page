import async from "async"
import React from "react"
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { StaticRouter, createServerRenderContext } from "react-router"

import createStore from "./store"
import CreateApp from "./components/app"
import { viewInProgressOrder } from "../database/api/view_order"
import populateOrder from "./presenters/populate_order"
import requestBuilder from "../request_builders"

const ReactComponent = ({location, userid}, {logger, queryDb, redisClient}, cb) => {
  let err = null
  const context = createServerRenderContext()
  const pageInProgress = location === '/order/process' || location === '/order/confirm' ? true : false
  const { products, categories, viewOrder } = requestBuilder({redisClient, queryDb, logger})

  const requests = { products, categories }

  async.waterfall(
    [
      (done) => {
        if(pageInProgress) {
          viewInProgressOrder([userid], {logger, queryDb}, (err, res) => {
            if(res && res.length) {
              return done(null, {orderid: res[0].id, status: res[0].status})
            }
            done(err, {})
          })
        } else {
          done(null, {})
        }
      },
      ({orderid, status}, done) => {
        if(pageInProgress) {
          if(orderid) {
            const orderInfo = viewOrder({orderid, userid})
            Object.assign(requests, orderInfo)
          } else {
            return done({reason: 'order_not_found'})
          }
        }

        async.parallel(requests, (err, results) => {
          done(err, results)
        })
      },
      (results, done) => {
        const initialPayload = populateOrder(results)

        // Create a new Redux store instance
        const store = createStore(initialPayload)

        let reactHTML = renderToString(
          <Provider store={store}>
            <StaticRouter location={location} context={context}>
              <CreateApp location={location} />
            </StaticRouter>
          </Provider>
        )

        const result = context.getResult()

        if (result.redirect) {
          err = {reason: 'redirect', location: result.redirect.pathname}
          return cb(err)
        } else {
          if (result.missed) {
            reactHTML = renderToString(
              <Provider store={store}>
                <ServerRouter location={location} context={context}>
                  <CreateApp location={location} />
                </ServerRouter>
              </Provider>
            )

            err = {reason: 'missed'}
          }
        }
        // Grab the initial state from our Redux store
        const preloadedState = store.getState()

        cb(err, reactHTML, preloadedState)
      }
    ],
    (err) => {
      cb(err)
    }
  )

}

export default ReactComponent;
