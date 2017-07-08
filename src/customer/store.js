import { createStore, compose, applyMiddleware } from "redux"

import orderApp from "./reducers"

const configureStore = (initialState) => {
  const orderStore = createStore(
    orderApp,
    initialState
  )

  return orderStore
}

export default configureStore
