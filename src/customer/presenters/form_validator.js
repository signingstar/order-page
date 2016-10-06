import validator, { isAlpha, isAlphanumeric, isEmail, isEmpty, isNumeric, matches, trim } from "validator"
import xssFilters from "xss-filters"
import _ from "underscore"

const errorMessage = 'Please provide correct input'

export const validateOrderData = ({ id, category, product, first_name, last_name, email, phone_number, image_count }) => {
  let err = {}

  category = xssFilters.inHTMLData(trim(category))
  product = xssFilters.inHTMLData(trim(product))
  first_name = xssFilters.inHTMLData(trim(first_name))
  last_name = xssFilters.inHTMLData(trim(last_name))
  email = xssFilters.inHTMLData(trim(email))
  phone_number = xssFilters.inHTMLData(trim(phone_number))
  // image_count = xssFilters.inHTMLData(trim(image_count))
  id = id ? xssFilters.inHTMLData(trim(id)) : undefined

  verifyAndAttachError('first_name', first_name, 'stringWithSpaces', err)
  verifyAndAttachError('last_name', last_name, 'stringWithSpaces', err)
  verifyAndAttachError('category', category, 'withSpaces', err)
  verifyAndAttachError('email', email, 'email', err)
  verifyAndAttachError('phone_number', phone_number, 'numeric', err)
  id && verifyAndAttachError('id', id, 'numeric', err)

  if(!_.isEmpty(err)) {
    return {err}
  }

  const formData = { id, category, product, first_name, last_name, email, phone_number, image_count }

  return { formData }
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

const verifyAndAttachError = (id, value, type, err) => {
  if(!verifyField(value, type)) {
    err[id] = errorMessage
  }
}
