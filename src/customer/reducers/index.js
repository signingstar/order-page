import { combineReducers } from "redux"

import order from "./order"
import albums from "./albums"
import images from "./images"
import users from "./users"
import reactionByUser from "./reaction_by_user"

const orderApp = combineReducers({
  order,
  albums,
  images,
  users,
  reactionByUser
})

export default orderApp
