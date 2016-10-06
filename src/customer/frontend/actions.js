import {ajax} from "jquery"

export const SET_PRODUCT = 'SET_PRODUCT'
export const RESET_PRODUCT = 'RESET_PRODUCT'
export const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILES = 'SET_FILES'

export const setProduct = (id, value) => {
  return {
    type: SET_PRODUCT,
    params: [id, value]
  }
}

export const resetProduct = () => {
  return {
    type: RESET_PRODUCT
  }
}

export const updateCustomerDetails = (key, value) => {
  return {
    type: UPDATE_CUSTOMER_DETAILS,
    params: {[key]: value}
  }
}

export const updateOrder = (key, value) => {
  return {
    type: UPDATE_ORDER,
    params: {[key]: value}
  }
}

export const setFiles = (files) => {
  return {
    type: SET_FILES,
    value: files
  };
}

export const createOrder = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/create',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}
