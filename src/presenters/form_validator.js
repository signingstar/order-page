import validator, { isAlpha, isAlphanumeric, isEmail, isEmpty, isNumeric, matches, trim } from "validator"
import xssFilters from "xss-filters"
import _ from "underscore"

const invalidMessage = 'Please provide correct input'
const emptyMessage = 'This field can not be blank'

export const validateOrderData = ({ id, category, product, first_name, last_name, email, phone_number, image_count }) => {
  let err = {}

  first_name = verifyAndAttachError('first_name', first_name, 'stringWithSpaces', err)
  last_name = verifyAndAttachError('last_name', last_name, 'stringWithSpaces', err)
  category = verifyAndAttachError('category', category, 'stringWithNoSpaces', err)
  product = verifyAndAttachError('product', product, 'numeric', err)
  email = verifyAndAttachError('email', email, 'email', err)
  phone_number = verifyAndAttachError('phone_number', phone_number, 'numeric', err)
  id = verifyAndAttachError('id', id, 'numeric', err, true)

  if(!_.isEmpty(err)) {
    return {err}
  }

  const orderData = { category, product, first_name, last_name, email, phone_number, image_count }
  if(id) {
    orderData.id = id
  }

  return { orderData }
}

export const validateCustomerLinkData = ({userHash, orderId}) => {
  let err = {}

  orderId = xssFilters.inHTMLData(trim(orderId))
  verifyAndAttachError('orderId', orderId, 'isAlphaNumeric', err)

  if(!_.isEmpty(err)) {
    return {err}
  }
  const formData = {userHash, orderId}

  return {formData}
}

export const validateOrderId = ({}) => {

}

export const validateProcessOrderData = ({order_id}) => {
  let err = {}

  order_id = xssFilters.inHTMLData(trim(order_id))
  verifyAndAttachError('order_id', order_id, 'isAlphaNumeric', err)

  if(!_.isEmpty(err)) {
    return {err}
  }
  const orderData = {order_id}

  return {orderData}
}

export const validateConfirmOrderData = ({order_id, order_name}) => {
  let err = {}

  order_id = xssFilters.inHTMLData(trim(order_id))
  order_name = xssFilters.inHTMLData(trim(order_name))
  verifyAndAttachError('order_id', order_id, 'isAlphaNumeric', err)
  verifyAndAttachError('order_name', order_name, 'withSpaces', err)

  if(!_.isEmpty(err)) {
    return {err}
  }
  const orderData = {order_id, order_name}

  return {orderData}
}

const verifyField = (value, type) => {
  switch(type) {
    case 'withSpaces':
      return !isEmpty(value)
    case 'stringWithSpaces':
      return !isEmpty(value) && matches(value, /^[a-z\s ]+$/i)
    case 'stringWithNoSpaces':
      return !isEmpty(value) && isAlpha(value)
    case 'isAlphaNumeric':
      return !isEmpty(value) && isAlphanumeric(value)
    case 'email':
      return !isEmpty(value) && isEmail(value)
    case 'numeric':
      return !isEmpty(value) && isNumeric(value)
    default:
      return true
  }
}

const verifyAndAttachError = (id, value, type, err, optional) => {
  if(value) {
    value = xssFilters.inHTMLData(trim(value))
    if(!verifyField(value, type)) {
      err[id] = invalidMessage
    }
  } else if(!optional) {
    err[id] = emptyMessage
  }

  return value
}
