import { SET_PRODUCT, RESET_PRODUCT } from "../actions"

const product = (state = {}, {type, params = {}}) => {
  switch (type) {
    case SET_PRODUCT:
      return params
    case RESET_PRODUCT:
      return {}
    default:
      return state
  }
}

export default product
