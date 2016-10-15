import { combineReducers } from "redux"

import product from "./product"
import customer from "./customer"
import order from "./order"
import error from "./error"
import products from "./products"
import categories from "./categories"
import image from "./image"

const orderApp = combineReducers({
  products,
  categories,
  product,
  customer,
  order,
  image,
  error
})

export default orderApp
