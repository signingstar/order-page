import { UPDATE_CUSTOMER_DETAILS, MERGE_REACTIONS } from "../actions"

const customerDetails = (state = {}, {type, params = []}) => {
  switch (type) {
    case UPDATE_CUSTOMER_DETAILS:
      return Object.assign({}, state, params, {dirty: true})

    case MERGE_REACTIONS:
      return Object.assign({}, state, params, {merged: true})

    default:
      return state
  }
}

export default customerDetails
