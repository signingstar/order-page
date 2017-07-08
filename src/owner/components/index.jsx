import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import {BrowserRouter as Router} from 'react-router-dom'

import createStore from "../store"
import App from "./app"

const preloadedState = window.__PRELOADED_STATE__
const store = createStore(preloadedState)
const rootElem = document.getElementById('main-contents')

const renderDom = () => {
  render(
    <Provider store={store}>
      <Router>
        {({router}) => (
          <App />
        )}
      </Router>
    </Provider>,
    rootElem
  )
}

renderDom()
store.subscribe(renderDom)
