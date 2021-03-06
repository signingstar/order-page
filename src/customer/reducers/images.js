import { LIKES, LIKED, UPDATE_REACTION, COMMENT_ON_IMAGE, MERGE_REACTIONS } from "../actions"

const updateFeedback = (index, {key, value}, state) => {
  const image = Object.assign({}, state[index])

  image[key] = value

  const newState = state.slice()
  newState[index] = image

  return newState
}

const findImage = (albumId, newState, index) => {
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

  return image

}

const updateReaction = (id, value, images) => {
  if(!images[id]) return images
  let image = Object.assign({}, images[id])

  image[LIKES] = value
  image[LIKED] = image[LIKED] || []

  image[LIKED] = image[LIKED].filter(likeElem => likeElem.name !== 'You')

  image[LIKED].push({name: 'You', reaction_type: value})

  return Object.assign({}, images, {[id]: image})
}

const mergeReactions = (obj, state) => {
  const newState = Object.assign({}, state)

  let currentIndex = 0
  for(let uuid in obj) {
    const {albumId, likes, liked, forceQualify} = obj[uuid]
    const album = Object.assign({}, state[albumId])
    const files = album.files = album.files.slice()
    const image = files.find(file => file.id === uuid)

    image[LIKES] = likes
    image[LIKED] = liked

    if(forceQualify) {
      image.forceQualify = forceQualify
    }
  }

  return newState
}

const mergeScore = (scores, state) => {
  const newState = Object.assign({}, state)
  const albums = {}

  for(let imageId in scores) {
    const {album_id, score} = scores[imageId]

    const image = newState[imageId]
    image.score = score
    // newAlbum[imageId] = image
  }

  return newState
}

const updateQualification = (params, state) => {
  const {imageId, albumId, qualified} = params

  const newState = Object.assign({}, state)
  const image = newState[imageId]
  image.force_qualify = {name: 'You', reaction: qualified}

  return newState
}

const images = (state = {}, {type, params = {}}) => {
  const { id, index, value, albumId } = params
  let newState, image

  switch (type) {
    case UPDATE_REACTION:
      return updateReaction(id, value, state)

    case MERGE_REACTIONS:
      return mergeReactions(params, state)

    case 'UPDATE_SCORE':
      return mergeScore(params, state)

    case 'UPDATE_QUALIFICATION':
      return updateQualification(params, state)

    default:
      return state
  }
}

export default images
