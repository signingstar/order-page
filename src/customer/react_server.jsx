import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { StaticRouter } from "react-router"
import { pick } from "underscore"

import createStore from "./store"
import App from "./components/app"

import { LIKES, LIKED } from "../globals"

const albumifyImages = (imageList, albumList) => {
  let albums = {}

  albumList.forEach((album, index) => albums[album.id] = { name: album.name, priority: index + 1, files: []})

  for(let imageId in imageList) {
    const image = imageList[imageId]
    albums[image.album_id].files.push(imageId)
  }
  // Object.keys(imageList).forEach((image) => albums[image.album_id].files.push(image) )

  return albums
}

const prepareInitialState = (order, products, categories, imageReaction) => {
  const { users, productid, albumlist, imagefiles } = order

  const product = products.find(product => product.id === order.productid)

  order.productLabel = product.description
  let userList = []

  if(users && order.role === 5) {
    const userIds = Object.keys(users)

    for(let userId in users) {
      const user = users[userId]

      if(user.active) {
        userList.push({email: userId, ...users[userId]})
      }
    }
  }

  const albums = albumifyImages(imagefiles, albumlist)
  const minOrder = pick(order, 'id', 'productLabel', 'role', 'photographer', 'orderstatus')

  // const imagesWithReaction = imageReaction ? mergeReaction(imageReaction, imagefiles) : images

  return { order: minOrder, images: imagefiles, users: userList, albums }
}

export const mergeReaction = (reaction, images) => {
  const image_id = Object.keys(reaction)[0]
  const image = images.find(image => image_id === image.id)

  image[LIKES] = reaction[image_id].likes
  image[LIKED] = reaction[image_id].liked
}

const ReactComponent = (location, {orderResult, products, categories, imageReaction}, cb) => {
  let err = null
  const initialPayload = prepareInitialState(orderResult, products, categories, imageReaction)
  const context = {}

  // Create a new Redux store instance
  const store = createStore(initialPayload)

  let reactHTML = renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const redirectUrl = context.url

  if (redirectUrl) {
    err = {reason: 'redirect', location: redirectUrl}
    return cb(err)
  }

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  cb(err, {reactHTML, preloadedState})
}

export default ReactComponent
