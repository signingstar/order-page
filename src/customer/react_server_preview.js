import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"

import createStore from "./preview/store";
import App from "./preview/components/app"

const albumifyImages = (imageList, albumList) => {
  let albums = {}

  albumList.forEach((album, index) => albums[album.id.toString()] = { name: album.name, priority: index + 1, files: []})

  imageList.forEach((image) => albums[image.album_id].files.push(image) )

  return albums
}

const prepareInitialState = (order, imageList = [], albums) => {
  const { users } = order

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

  return { order, images, users: userList }
}

const ReactComponent = (location, {images, orderResult, albums}, {logger, queryDb, redisClient}, cb) => {
  let err = null
  let initialPayload = prepareInitialState(orderResult, images, albums)

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

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  cb(err, reactHTML, preloadedState)
}

export default ReactComponent;
