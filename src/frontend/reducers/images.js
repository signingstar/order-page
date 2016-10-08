import { SET_IMAGES, REMOVE_IMAGE } from "../actions"

const images = (state = [], {type, params = []}) => {
  let newState
  switch (type) {
    case SET_IMAGES:
      newState = state.slice()
      params.map(image => newState.push(image))
      return newState
    case REMOVE_IMAGE:
      newState = state.slice()
      newState.push(params)
      return newState
    default:
      return state
  }
}

export default images
