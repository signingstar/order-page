import { LIKES, LIKED, UPDATE_REACTION, COMMENT_ON_IMAGE, MERGE_REACTIONS } from "../actions"

const updateFeedback = (index, {key, value}, state) => {
  const image = Object.assign({}, state[index])

  image[key] = value

  const newState = state.slice()
  newState[index] = image

  return newState
}

const updateReaction = (index, value, state) => {
  const image = Object.assign({}, state[index])

  image[LIKES] = value

  const newState = state.slice()
  newState[index] = image

  return newState
}

const mergeReactions = (obj, state) => {
  const newState = state.slice()

  for(let i in obj) {
    const value = obj[i]
    const image = Object.assign({}, state[i])
    console.log(`before: ${JSON.stringify(image)}`)

    image[LIKES] = value.likes
    image[LIKED] = value.liked
    newState[i] = image
  }

  return newState
}

const images = (state = [], {type, params = {}}) => {
  const { id, index, value } = params
  let newState, image

  switch (type) {
    case UPDATE_REACTION:
      return updateReaction(index, value, state)

    case MERGE_REACTIONS:
      return mergeReactions(params, state)

    default:
      return state
  }
}

export default images
