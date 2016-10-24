import { pick } from "underscore"

const albumifyImages = (imageList, albumList) => {
  let albums = {}

  albumList.forEach((album, index) => albums[album.id] = { name: album.name, priority: index + 1, files: []})

  imageList.forEach(file => {
    const {album_id, originalname, size, destination, filename} = JSON.parse(file)

    albums[album_id].files.push(
      {
        name: originalname,
        size,
        filesrc: `${destination}/${filename}`,
        uploaded: true
      }
    )
  })

  Object.keys(albums).forEach(albumId => {
    const count = albums[albumId].uploaded = albums[albumId].files.length
    const size = count > 1 ? albums[albumId].files.reduce((prev, curr) => prev + curr.size, 0) : (count > 0 ? albums[albumId].files[0].size : 0)
    albums[albumId].uploadedSize = size
  })

  return albums
}

const populateOrder = (results) => {
  const {products, categories, orderInfo} = results

  if(!orderInfo) {
    return { products, categories}
  }

  const {order, files} = orderInfo
  const productObj = products.find(product => product.id === +order.product)

  order.product = productObj ? {key: productObj.id, value: productObj.description} : ''
  order.customer = pick(order, 'email', 'phone_number', 'image_count')
  order.customer.cust_name = `${order.first_name} ${order.last_name}`

  let {albums} = pick(order, 'albums')

  albums = albumifyImages(files, albums)

  return { products, categories, order, albums}
}

export default populateOrder
