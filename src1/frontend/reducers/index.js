import "core-js/shim";
import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import selectionState from "./selection_state";
import categoryState from "./category_state";

const orderApp = combineReducers({
  categoryState,
  selectionState,
  routing: routerReducer
})

export default orderApp
