import { SET_IMAGES, REMOVE_IMAGE, UPDATE_ORDER } from "../actions"

const defaultState = {
  queued: 0,
  queuedSize: 0,
  uploaded: 0,
  uploadedSize: 0
}

const image = (state = {}, {type, params = []}) => {
  let newState, newAlbum, imageSize = 0
  switch (type) {
    case UPDATE_ORDER:
      params = params.albumData
    case 'ADD_ALBUM':
      newState = Object.assign({}, state)

      newState[params.id] = { name: params.name, priority: params.priority}

      return newState

    case SET_IMAGES:
      newState = Object.assign({}, state)
      var { albumId, images} = params
      newAlbum = newState[albumId] = Object.assign({}, state[albumId])
      var files = newAlbum.files ? newAlbum.files.slice() : []

      if(!newAlbum.queued && !newAlbum.uploaded) {
        Object.assign(newAlbum, defaultState)
      }

      images.forEach(image => {
        files.push(image)
        imageSize += image.size
      })

      newAlbum.files = files
      Object.assign(newAlbum, {queued: (newAlbum.queued || 0) + images.length, queuedSize: (newAlbum.queuedSize || 0) + imageSize})

      return newState
    case 'REMOVE_IMAGE':
      newState = Object.assign({}, state)
      var { albumId, image } = params
      newState[albumId] = Object.assign({}, state[albumId])
      newAlbum = newState[albumId]
      var files = newAlbum.files.slice()

      const index = files.findIndex(file => file.name ===  image.name)

      if(index > -1) {
        files.splice(index, 1)
      }

      newAlbum.files = files

      if(!image.uploaded) {
        Object.assign(newAlbum, {queued: newAlbum.queued - 1, queuedSize: newAlbum.queuedSize - image.size})
      } else {
        Object.assign(newAlbum, {uploaded: newAlbum.uploaded - 1, uploadedSize: newAlbum.uploadedSize - image.size})
      }

      return newState

    case 'SET_IMAGE_UPLOADED':
      newState = Object.assign({}, state)
      newState[params] = Object.assign({}, state[params])
      newAlbum = newState[params]

      newAlbum.files.forEach(image => {
        image.uploaded = true
        imageSize += image.size
      })

      Object.assign(newAlbum, {
        uploaded: newAlbum.files.length,
        uploadedSize: imageSize,
        queued: 0,
        queuedSize: 0
      })

      return newState

    case 'REMOVE_ALBUM':
      newState = Object.assign({}, state)
      delete newState[params]

      return newState

    default:
      return state
  }
}

export default image
