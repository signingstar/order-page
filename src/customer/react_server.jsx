import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"

import createStore from "./frontend/store";
import App from "./frontend/components/app"

const ReactComponent = ({location, orderResult}, {logger, queryDb}, cb) => {
  let err = null

  //TODO Add validation
  let initialPayload = {order: orderResult};

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

export default ReactComponent;
