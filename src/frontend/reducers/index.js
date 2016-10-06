import { combineReducers } from "redux"

import product from "./product"
import customer from "./customer"
import order from "./order"
import error from "./error"

const orderApp = combineReducers({
  product,
  customer,
  order,
  error
})

export default orderApp
