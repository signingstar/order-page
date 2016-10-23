import async from "async"
import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux"
import { ServerRouter, createServerRenderContext } from "react-router"
import { pick } from "underscore"

import createStore from "./frontend/store";
import CreateApp from "./frontend/components/app"
import RequestBuilder from "./request_builders/view_order"

const albumifyImages = (imageList, albumList) => {
  let albums = {}

  albumList.forEach((album, index) => albums[album.id] = { name: album.name, priority: index + 1, files: []})

  imageList.forEach((image) => {
    image = JSON.parse(image)
    albums[image.album_id].files.push(Object.assign(image, {name: image.originalname, uploaded: true}))
  })

  Object.keys(albums).forEach(albumId => {
    const count = albums[albumId].uploaded = albums[albumId].files.length
    const size = count > 1 ? albums[albumId].files.reduce((prev, curr) => prev + curr.size, 0) : (count > 0 ? albums[albumId].files[0].size : 0)
    albums[albumId].uploadedSize = size
  })

  return albums
}

const prepareInitialState = (results) => {
  const {products, orderInfo: {order, files}} = results
  const productObj = products.find(product => product.id === +order.product)

  order.product = productObj ? {key: productObj.id, value: productObj.description} : ''
  order.customer = pick(order, 'email', 'phone_number', 'image_count', 'category')
  order.customer.cust_name = `${order.first_name} ${order.last_name}`

  const {albums} = pick(order, 'albums')

  return albumifyImages(files, albums)
}

const ReactComponent = ({location, userid, orderid}, {logger, queryDb, redisClient}, cb) => {
  let err = null
  const context = createServerRenderContext()
  const requests = RequestBuilder({userid, orderid}, {logger, queryDb, redisClient})

  async.waterfall(
    [
      (done) => {
        async.parallel(requests, (err, results) => {
          done(err, results)
        })
      },
      (results, done) => {
        // const initialPayload = JSON.parse(`
        //   {
        //     "products":[
        //       {"id":1,"name":"wedding_album","description":"Wedding Album Design and Printing"},
        //       {"id":2,"name":"retouching","description":"Image Retouching"},
        //       {"id":3,"name":"post_processing","description":"Image Post-Processing"},
        //       {"id":4,"name":"portrait_album","description":"Portrait Album Design and Printing"}
        //     ],
        //     "categories":[
        //       {"id":3,"name":"babynkids","description":"Baby & Kids"},
        //       {"id":4,"name":"anniversary","description":"Birthday/Anniversary"},
        //       {"id":5,"name":"wedding","description":"Wedding"},
        //       {"id":6,"name":"travel","description":"Travel & Adventure"}
        //     ],
        //     "product":{"key":1,"value":"Wedding Album Design and Printing"},
        //     "customer":{"cust_name":"Test user","email":"test3@user.com","phone_number":"234","category":"anniversary","image_count":"2","dirty":false},
        //     "order":{"id":121},
        //     "image":{
        //       "624":{"name":"Pre-Wedding","priority":100,"queued":0,"queuedSize":0,"uploaded":2,"uploadedSize":228446,"files":[{"size": 100000},{"size": 250000}]},
        //       "652":{"name":"Wedding","priority":120,"queued":0,"queuedSize":0,"uploaded":1,"uploadedSize":543307,"files":[{"size": 200000}]}
        //     },
        //       "error":{}
        //   }`)

        const { products, categories, orderInfo: {order, files}} = results
        const albums = prepareInitialState(results)
        const initialPayload = { products, categories, order, image: albums }

        // Create a new Redux store instance
        const store = createStore(initialPayload)

        let reactHTML = renderToString(
          <Provider store={store}>
            <ServerRouter location={location} context={context}>
              <CreateApp location={location} />
            </ServerRouter>
          </Provider>
        )

        const result = context.getResult()

        if (result.redirect) {
          err = {reason: 'redirect', location: result.redirect.pathname}
          return cb(err)
        } else {
          if (result.missed) {
            reactHTML = renderToString(
              <Provider store={store}>
                <ServerRouter location={location} context={context}>
                  <CreateApp location={location} />
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
