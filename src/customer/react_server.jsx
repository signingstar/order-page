import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"

import createStore from "./frontend/store";
import App from "./frontend/components/app"
import RequestBuilder from "../request_builder"

const prepareInitialState = (orderData, staticData, imageList = []) => {
  const {products, categories} = staticData
  const product = products.find(product => product.id === orderData.productid)
  const order = Object.assign({}, orderData, {
    productLabel: product.description
  })

  const images = imageList.map(image => JSON.parse(image))

  return { order, images }
}

const ReactComponent = ({location, images, orderResult}, {logger, queryDb, redisClient}, cb) => {
  const context = createServerRenderContext()
  const requests = RequestBuilder({logger, queryDb, redisClient})

  async.waterfall(
    [
      (done) => {
        async.parallel(requests, (err, results) => {
          done(err, results)
        })
      },
      (results, done) => {
        let err = null
        let initialPayload = prepareInitialState(orderResult, results, images)

        const context = createServerRenderContext();
        // Create a new Redux store instance
        const store = createStore(initialPayload)

        let reactHTML = renderToString(
          <Provider store={store}>
            <ServerRouter location={location} context={context}>
              <App />
            </ServerRouter>
          </Provider>
        )

        const result = context.getResult()

        if (result.redirect) {
          err = {reason: 'redirect', location: result.redirect.pathname}
          cb(err)
        } else {
          if (result.missed) {
            reactHTML = renderToString(
              <Provider store={store}>
                <ServerRouter location={location} context={context}>
                  <App />
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
