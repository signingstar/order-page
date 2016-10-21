import { SET_FILES, UPDATE_ORDER, SET_ORDER_NAME, SET_PRODUCT, RESET_PRODUCT, UPDATE_CUSTOMER_DETAILS } from "../actions"

const order = (state = {customer:{}}, {type, params}) => {
  switch (type) {
    case UPDATE_ORDER:
      const customer = Object.assign({}, state.customer)
      customer.dirty = false
      return Object.assign({}, state, params.orderData, {customer})

    case SET_FILES:
      return Object.assign({}, state, {
        files: params,
      })

    case SET_ORDER_NAME:
      return Object.assign({}, state, {name: params})

    case SET_PRODUCT:
      return Object.assign({}, state, {product: params})

    case RESET_PRODUCT:
      return Object.assign({}, state, {product: {}})

    case UPDATE_CUSTOMER_DETAILS:
      const { key, value } = params
      const newCustomer = Object.assign({}, state.customer)
      newCustomer[key] = value
      newCustomer.dirty = true
      return Object.assign({}, state, {customer: newCustomer})

    default:
      return state
  }
}

export default order
