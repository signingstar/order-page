import albums from "./albums"
import fetchDbOrder from "./fetch_db_order"
import images from "./images"
import imageReaction from "./image_reactions"
import setImageReaction from "./set_image_reaction"

const requestList = (modules) => {

  return {
    getAlbums: (params, cb) => albums(params, modules, cb),
    fetchOrderForCustomer: (params, cb) => fetchDbOrder(params, modules, cb),
    getImages: (params, cb) => images(params, modules, cb),
    getImageReactions: (params, cb) => imageReaction(params, modules, cb),
    setImageReaction: (params, cb) => setImageReaction(params, modules, cb)
  }
}

export default requestList
