import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"

import createStore from "./frontend/store";
import App from "./frontend/components/app"
import requestBuilder from "../request_builders"

import { LIKES, LIKED } from "./frontend/actions"

const albumifyImages = (imageList, albumList) => {
  let albums = {}

  albumList.forEach((album, index) => albums[album.id.toString()] = { name: album.name, priority: index + 1, files: []})

  imageList.forEach((image) => albums[image.album_id].files.push(image) )

  return albums
}

const prepareInitialState = (order, staticData, imageList = [], imageReaction, albums) => {
  const {products, categories} = staticData
  const product = products.find(product => product.id === order.productid)
  const { users } = order

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

  delete order.users
  const images = albumifyImages(imageList, albums)
  const imagesWithReaction = imageReaction ? mergeReaction(imageReaction, imageList) : images

  return { order, images, users: userList }
}

export const mergeReaction = (reaction, images) => {
  const image_id = Object.keys(reaction)[0]
  const image = images.find(image => image_id === image.id)

  image[LIKES] = reaction[image_id].likes
  image[LIKED] = reaction[image_id].liked
}

const ReactComponent = (location, {images, orderResult, albums, imageReaction}, {logger, queryDb, redisClient}, cb) => {
  const context = createServerRenderContext()
  const RequestBuilder = requestBuilder({redisClient, queryDb, logger})

  const requests = { products: RequestBuilder.products, categories: RequestBuilder.categories}
  // const requests = RequestBuilder({logger, queryDb, redisClient})

  async.waterfall(
    [
      (done) => {
        async.parallel(requests, (err, results) => {
          done(err, results)
        })
      },
      (results, done) => {
        let err = null
        let initialPayload = prepareInitialState(orderResult, results, images, imageReaction, albums)

        const context = createServerRenderContext();
        // Create a new Redux store instance
        const store = createStore(initialPayload)

        let reactHTML = renderToString(
          <Provider store={store}>
            <ServerRouter location={location} context={context}>
              <App />
            </ServerRouter>
          </Provider>
        )

        const result = context.getResult()

        if (result.redirect) {
          err = {reason: 'redirect', location: result.redirect.pathname}
          cb(err)
        } else {
          if (result.missed) {
            reactHTML = renderToString(
              <Provider store={store}>
                <ServerRouter location={location} context={context}>
                  <App />
                </ServerRouter>
              </Provider>
            )

            err = {reason: 'missed'}
          }
        }
        // Grab the initial state from our Redux store
        const preloadedState = store.getState()

        cb(err, reactHTML, preloadedState)
      }
    ]
  )
}

export default ReactComponent;
