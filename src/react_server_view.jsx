import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"
import { pick } from "underscore"

import createStore from "./frontend/store";
import CreateApp from "./frontend/components/app"
import populateOrder from "./presenters/populate_order"
import requestBuilder from "./request_builders"

const ReactComponent = ({location, userid, orderid}, {logger, queryDb, redisClient}, cb) => {
  let err = null
  const context = createServerRenderContext()
  const RequestBuilder = requestBuilder({redisClient, queryDb, logger})
  const { products, categories, viewOrder } = RequestBuilder

  const orderInfo = (cb) => viewOrder({orderid, userid}, cb)

  const requests = { products, categories, orderInfo}

  async.waterfall(
    [
      (done) => {
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
    ]
  )

}

export default ReactComponent;
