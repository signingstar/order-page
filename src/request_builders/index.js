import images from "./all_images"
import rawImages from "./raw_images"

// ----------------- Customer ------------------
import albums from "./customer/albums"
import fetchDbOrder from "./customer/fetch_db_order"
import getImageReaction from "./customer/image_reactions"
import setImageReaction from "./customer/set_image_reaction"
import forceQualifyImage from "./customer/qualify_image"

// ------------------ Creator -------------------
import addAlbum from "./owner/add_album"
import updateAlbum from "./owner/update_album"
import removeAlbum from "./owner/remove_album"
import removeFile from "./owner/remove_file"
import searchAndRemoveFile from "./owner/search_remove_file"
import viewOrder from "./owner/view_order"
import persistOrder from "./owner/persist_order"
import getOrderInfo from "./owner/order_info"

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

    getOrderInfo: (params, cb) => getOrderInfo(params, {redisClient}, cb),
    addAlbum: (params, cb) => addAlbum(params, {redisClient}, cb),
    updateAlbum: (params, cb) => updateAlbum(params, {redisClient}, cb),
    removeAlbum: (params, cb) => removeAlbum(params, {redisClient}, cb),
    removeFile: (params, cb) => removeFile(params, {redisClient}, cb),
    searchAndRemoveFile: (params, cb) => searchAndRemoveFile(params, {redisClient}, cb),
    persistOrder: (params, cb) => persistOrder(params, {queryDb, logger}, cb),
    getRawImages: (params, cb) => rawImages(params, modules, cb),

    // Static Data

    products: (cb) => products(modules, cb),
    categories: (cb) => categories(modules, cb)
  }
}

export default requestList
