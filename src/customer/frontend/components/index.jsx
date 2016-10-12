import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import BrowserRouter from 'react-router/BrowserRouter'

import createStore from "../store"
import App from "./app"

const preloadedState = window.__PRELOADED_STATE__
const store = createStore(preloadedState)
const rootElem = document.getElementById('main-contents')

const renderDom = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        {({router}) => (
          <App />
        )}
      </BrowserRouter>
    </Provider>,
    rootElem
  )
}

renderDom()
store.subscribe(renderDom)
