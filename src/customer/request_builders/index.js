import albums from "./albums"
import fetchDbOrder from "./fetch_db_order"
import images from "./images"
import imageReaction from "./image_reactions"

const requestList = (modules) => {

  return {
    albums: (params, cb) => albums(params, modules, cb),
    fetchOrderForCustomer: (params, cb) => fetchDbOrder(params, modules, cb),
    images: (params, cb) => images(params, modules, cb),
    imageReactions: (params, cb) => imageReaction(params, modules, cb)
  }
}

export default requestList
