import { combineReducers } from "redux"

import order from "./order"
import albums from "./albums"
import images from "./images"
import users from "./users"

const orderApp = combineReducers({
  order,
  albums,
  images,
  users
})

export default orderApp
