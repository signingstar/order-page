import { combineReducers } from "redux"

import order from "./order"
import images from "./images"
import users from "./users"

const orderApp = combineReducers({
  order,
  images,
  users
})

export default orderApp
