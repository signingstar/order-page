import {ajax} from "jquery"

export const SET_PRODUCT = 'SET_PRODUCT'
export const RESET_PRODUCT = 'RESET_PRODUCT'
export const UPDATE_CUSTOMER_DETAILS = 'UPDATE_CUSTOMER_DETAILS'
export const UPDATE_CUSTOMER_STATUS = 'UPDATE_CUSTOMER_STATUS'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const SET_FILES = 'SET_FILES'

//Error related
export const CLEAR_ALL_ERRORS = 'CLEAR_ALL_ERRORS'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const SET_ERROR = 'SET_ERROR'
export const SET_SUCCESS = 'SET_SUCCESS'


export const setProduct = (key, value) => {
  return {
    type: SET_PRODUCT,
    params: {key, value}
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

export const updateCustomerFormStatus = (flag) => {
  return {
    type: UPDATE_CUSTOMER_STATUS,
    params: flag
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

//------------------------- Error Related ---------------------------

export const clearAllErrors = () => {
  return {
    type: CLEAR_ALL_ERRORS
  }
}

export const clearError = (category) => {
  return {
    type: CLEAR_ERROR,
    details: category
  }
}

export const setError = (message) => {
  return {
    type: SET_ERROR,
    details: message
  }
}

export const setSuccess = (message) => {
  return {
    type: SET_SUCCESS,
    details: message || {success: true}
  }
}

//-------------------------- Server calls ----------------------------

export const createOrder = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/create',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const processOrder = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/process',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const confirmOrder = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/confirm',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}
