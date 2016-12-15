import { CLEAR_ALL_ERRORS, CLEAR_ERROR, SET_ERROR, SET_SUCCESS } from "../actions"

const errorState = (state = {}, {type, details = {}}) => {
  switch (type) {
    case CLEAR_ALL_ERRORS:
      return {}
    case CLEAR_ERROR:
      const message = Object.assign({}, state.message)
      delete message[details]
      return Object.assign({}, state, {message})
    case SET_SUCCESS:
    case SET_ERROR:
      return Object.assign({}, state, {message: details})
    default:
      return state
  }
}

export default errorState
