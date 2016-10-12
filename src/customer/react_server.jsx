import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"

import createStore from "./frontend/store";
import App from "./frontend/components/app"
import RequestBuilder from "../request_builder"

import { LIKES, LIKED } from "./frontend/actions"

const prepareInitialState = (order, staticData, imageList = [], imageReaction) => {
  const {products, categories} = staticData
  const product = products.find(product => product.id === order.productid)
  const { users } = order

  order.productLabel = product.description
  let userList = []

  if(users) {
    const userIds = Object.keys(users)

    for(let userId in users) {
      userList.push({email: userId, ...users[userId]})
    }
  }

  order.users = userList
  const images = imageList.map(image => JSON.parse(image))
  const imagesWithReaction = imageReaction ? mergeReaction(imageReaction, images) : images

  return { order, images }
}

export const mergeReaction = (reaction, images) => {
  const image_id = Object.keys(reaction)[0]
  const image = images.find(image => image.id === image_id)

  image[LIKES] = reaction[image_id].likes
  image[LIKED] = reaction[image_id].liked
}


const ReactComponent = (location, {images, orderResult, imageReaction}, {logger, queryDb, redisClient}, cb) => {
  const context = createServerRenderContext()
  const requests = RequestBuilder({logger, queryDb, redisClient})

  async.waterfall(
    [
      (done) => {
        async.parallel(requests, (err, results) => {
          done(err, results)
        })
      },
      (results, done) => {
        let err = null
        let initialPayload = prepareInitialState(orderResult, results, images, imageReaction)

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
