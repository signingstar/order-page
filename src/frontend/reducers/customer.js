import { UPDATE_CUSTOMER_DETAILS, UPDATE_CUSTOMER_STATUS } from "../actions"

const customerDetails = (state = {}, {type, params = []}) => {
  switch (type) {
    case UPDATE_CUSTOMER_DETAILS:
      return Object.assign({}, state, params)
    case UPDATE_CUSTOMER_STATUS:
      return Object.assign({}, state, {dirty: params})
    default:
      return state
  }
}

export default customerDetails
