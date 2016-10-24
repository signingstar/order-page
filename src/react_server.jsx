import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"

import createStore from "./frontend/store";
import CreateApp from "./frontend/components/app"
import StaticRequestBuilder from "./request_builder"
import OrderRequestBuilder from "./request_builders/view_order"
import { viewInProgressOrder } from "./database/api/view_order"
import populateOrder from "./presenters/populate_order"

const ReactComponent = ({location, userid}, {logger, queryDb, redisClient}, cb) => {
  let err = null
  const context = createServerRenderContext()
  const requests = StaticRequestBuilder({logger, queryDb, redisClient})
  const pageInProgress = location === '/order/process' || location === '/order/confirm' ? true : false

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
            const requestOrderData = OrderRequestBuilder({userid, orderid}, {logger, queryDb, redisClient})
            Object.assign(requests, requestOrderData)
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
            <ServerRouter location={location} context={context}>
              <CreateApp location={location} />
            </ServerRouter>
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
