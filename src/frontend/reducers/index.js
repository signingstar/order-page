import { combineReducers } from "redux"

import order from "./order"
import error from "./error"
import products from "./products"
import categories from "./categories"
import image from "./image"
import imageList from "./image_list"


const orderApp = combineReducers({
  products,
  categories,
  order,
  image,
  imageList,
  error
})

export default orderApp
