import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from 'react-router-redux';

import orderApp from "./reducers";

const configureStore = (history, initialState) => {
  const orderStore = createStore(
    orderApp,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  )

  return orderStore;
}

export default configureStore;
