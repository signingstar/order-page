import { SET_FILES, UPDATE_ORDER, SET_ORDER_NAME } from "../actions"

const order = (state = {}, {type, params}) => {
  switch (type) {
    case UPDATE_ORDER:
      return Object.assign({}, state, params.orderData)

    case SET_FILES:
      return Object.assign({}, state, {
        files: params,
      })

    case SET_ORDER_NAME:
      return Object.assign({}, state, {name: params})

    default:
      return state
  }
}

export default order
