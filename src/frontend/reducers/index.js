import { combineReducers } from "redux"

import order from "./order"
import error from "./error"
import products from "./products"
import categories from "./categories"
import albums from "./albums"
import imageList from "./image_list"


const orderApp = combineReducers({
  products,
  categories,
  order,
  albums,
  imageList,
  error
})

export default orderApp
