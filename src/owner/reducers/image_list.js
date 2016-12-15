import { POPULATE_IMAGES, SWAP_ALBUM } from "../actions"

const imageList = (state = [], {type, params}) => {
  switch(type) {
    case POPULATE_IMAGES:
      return params || {}

    case SWAP_ALBUM:
      const { src, dest } = params
      const newState = state.slice()
      const srcAlbum = newState[src]
      const tempPriority = srcAlbum.priority

      srcAlbum.priority = newState[dest].priority
      newState[dest].priority = tempPriority
      newState.splice(src, 1)
      newState.splice(dest, 0, srcAlbum)

      return newState
  }

  return state
}

export default imageList
