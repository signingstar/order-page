import { SET_IMAGES, REMOVE_IMAGE } from "../actions"

const defaultState = {
  queued: 0,
  queuedSize: 0,
  uploaded: 0,
  uploadedSize: 0
}

const image = (state = {}, {type, params = []}) => {
  let newState, imageSize = 0
  switch (type) {
    case SET_IMAGES:
      newState = Object.assign({}, state)
      var files = newState.files ? newState.files.slice() : []

      if(!state.queued && !state.uploaded) {
        Object.assign(newState, defaultState)
      }

      params.forEach(image => {
        files.push(image)
        imageSize += image.size
      })

      newState.files = files
      Object.assign(newState, {queued: newState.queued + params.length, queuedSize: newState.queuedSize + imageSize})
      return newState
    case 'REMOVE_IMAGE':
      newState = Object.assign({}, state)
      var files = newState.files.slice()

      const index = files.findIndex(image => image.name ===  params.name)

      if(index > -1) {
        files.splice(index, 1)
      }

      newState.files = files
      Object.assign(newState, {queued: newState.queued - 1, queuedSize: newState.queuedSize - params.size})

      return newState

    case 'SET_IMAGE_UPLOADED':
      newState = Object.assign({}, state)

      newState.files.forEach(image => {
        imageSize += image.size
      })

      Object.assign(newState, {
        uploaded: newState.files.length,
        uploadedSize: imageSize,
        queued: 0,
        queuedSize: 0
      })

      return newState

    default:
      return state
  }
}

export default image
