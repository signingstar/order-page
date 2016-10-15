import { UPDATE_CUSTOMER_DETAILS, UPDATE_ORDER } from "../actions"

const customerDetails = (state = {}, {type, params = []}) => {
  switch (type) {
    case UPDATE_CUSTOMER_DETAILS:
      return Object.assign({}, state, params)
    case UPDATE_ORDER:
      return Object.assign({}, state, {dirty: params.dirty})
    default:
      return state
  }
}

export default customerDetails
