import { combineReducers } from "redux"

import order from "./order"
import images from "./images"

const orderApp = combineReducers({
  order,
  images
})

export default orderApp
