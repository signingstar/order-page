import addOrder from "../database/api/add_order"
import { updateOrder } from "../database/api/db_updates"

import { validateOrderData, validateProcessOrderData, validateConfirmOrderData } from "./form_validator"

export const createOrder = ({formData, session}, { logger, queryDb }, cb) => {
  const {user} = session
  if(!user || !user.id) {
    return cb({err: {message: 'session timed out', statusCode: 401}})
  }

  const { err, orderData } = validateOrderData(formData)
  if(err) {
    return cb({err})
  }

  const { category, product, first_name, last_name, email, phone_number, image_count } = orderData
  const userid = user.id
  const queryParams = [userid, category, product, first_name, last_name, email, phone_number, image_count]

  addOrder(queryParams, {logger, queryDb}, (err, result) => {
    cb({err, orderData, result})
  })
}

export const processOrder = ({params, body, session}, { logger, queryDb }, cb) => {
  const {user} = session
  if(!user || !user.id) {
    return cb({err: {message: 'session timed out', statusCode: 401}})
  }

  const { err, orderData } = validateProcessOrderData(body)
  if(err) {
    return cb({err})
  }

  const { order_id } = orderData
  const userid = user.id
  const queryParams = [userid, order_id, 'in_process']

  updateOrder(queryParams, {logger, queryDb}, (err, result) => {
    cb({err, orderData, result})
  })
}

export const confirmOrder = ({params, body, session}, { logger, queryDb }, cb) => {
  const {user} = session
  if(!user || !user.id) {
    return cb({err: {message: 'session timed out', statusCode: 401}})
  }

  const { err, orderData } = validateConfirmOrderData(body)
  if(err) {
    return cb({err})
  }

  const { order_id } = orderData
  const userid = user.id
  const queryParams = [userid, order_id, 'confirmed']

  updateOrder(queryParams, {logger, queryDb}, (err, result) => {
    cb({err, orderData, result})
  })
}