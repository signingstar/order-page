import { UPDATE_CUSTOMER_DETAILS } from "../actions"

const customerDetails = (state = {}, {type, params = []}) => {
  switch (type) {
    case UPDATE_CUSTOMER_DETAILS:
      return Object.assign({}, state, params, {dirty: true})
    default:
      return state
  }
}

export default customerDetails
