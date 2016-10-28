import { LIKES, LIKED, UPDATE_REACTION, COMMENT_ON_IMAGE, MERGE_REACTIONS } from "../actions"

const updateFeedback = (index, {key, value}, state) => {
  const image = Object.assign({}, state[index])

  image[key] = value

  const newState = state.slice()
  newState[index] = image

  return newState
}

const updateReaction = (index, value, state, albumId) => {
  const newState = Object.assign({}, state)

  let album, image

  if(albumId) {
    album = Object.assign({}, newState[albumId])
    album.files = album.files.slice()
    image = album.files[index]
  } else {
    let currentIndex = 0
    for(let album in newState) {
      const currentAlbumLength = newState[album].files.length
      if(index >= currentIndex + currentAlbumLength) {
        currentIndex += currentAlbumLength
      } else {
        album = Object.assign({}, newState[album])
        album.files = album.files.slice()
        image = album.files[index - currentIndex]
        break
      }
    }
  }

  image[LIKES] = value
  const reactionObj = image[LIKED].find(like => like.name === 'You')

  if(reactionObj) {
    reactionObj.reaction_type = value
  } else {
    image[LIKED].push({name: "You", reaction_type: value})
  }

  return newState
}

const mergeReactions = (obj, state) => {
  const newState = Object.assign({}, state)

  let currentIndex = 0
  for(let uuid in obj) {
    const value = obj[uuid]
    const album = Object.assign({}, state[value.albumId])
    const files = album.files = album.files.slice()
    const image = files.find(file => file.id === uuid)

    image[LIKES] = value.likes
    image[LIKED] = value.liked
  }

  return newState
}

const images = (state = [], {type, params = {}}) => {
  const { id, index, value, albumId } = params
  let newState, image

  switch (type) {
    case UPDATE_REACTION:
      return updateReaction(index, value, state, albumId)

    case MERGE_REACTIONS:
      return mergeReactions(params, state)

    default:
      return state
  }
}

export default images
