import { SET_FILES, UPDATE_ORDER } from "../actions"

const order = (state = {}, {type, params}) => {
  switch (type) {
    case UPDATE_ORDER:
      return Object.assign({}, state, params)
    case SET_FILES:
      newState =  Object.assign({}, state, {
        files: params,
      })
      return newState
    default:
      return state
  }
}

export default order
