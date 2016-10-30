import images from "./all_images"

// ----------------- Customer ------------------
import albums from "./customer/albums"
import fetchDbOrder from "./customer/fetch_db_order"
import getImageReaction from "./customer/image_reactions"
import setImageReaction from "./customer/set_image_reaction"
import forceQualifyImage from "./customer/qualify_image"

// ------------------ Creator -------------------
import addAlbum from "./creater/add_album"
import updateAlbum from "./creater/update_album"
import removeAlbum from "./creater/remove_album"
import removeFile from "./creater/remove_file"
import searchAndRemoveFile from "./creater/search_remove_file"
import viewOrder from "./creater/view_order"

// ------------------ Common ---------------------
import products from "./products"
import categories from "./categories"

const requestList = (modules) => {
  const { logger, queryDb, Mailer, redisClient } = modules

  return {
    getAlbums: (params, cb) => albums(params, modules, cb),
    fetchOrderForCustomer: (params, cb) => fetchDbOrder(params, modules, cb),
    getImages: (params, cb) => images(params, modules, cb),
    getImageReactions: (params, cb) => getImageReaction(params, modules, cb),
    setImageReaction: (params, cb) => setImageReaction(params, modules, cb),
    forceQualifyImage: (params, cb) => forceQualifyImage(params, modules, cb),
    viewOrder: (params, cb) => viewOrder(params, modules, cb),

    addAlbum: (params, cb) => addAlbum(params, {redisClient}, cb),
    updateAlbum: (params, cb) => updateAlbum(params, {redisClient}, cb),
    removeAlbum: (params, cb) => removeAlbum(params, {redisClient}, cb),
    removeFile: (params, cb) => removeFile(params, {redisClient}, cb),
    searchAndRemoveFile: (params, cb) => searchAndRemoveFile(params, {redisClient}, cb),

    // Static Data

    products: (cb) => products(modules, cb),
    categories: (cb) => categories(modules, cb)
  }
}

export default requestList
