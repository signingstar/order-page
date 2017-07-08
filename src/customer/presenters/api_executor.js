
import { updateOrderToFinalize } from "../../database/api/db_updates"

export const createOrder = ({params, body, session}, { responders, logger, queryDb }) => {
  const {user} = session
  if(!user || !user.id) {
    responders.json(null, {message: 'session timed out'}, 401 )
    return
  }

  const { err, formData } = validateOrderData(body)
  if(err) {
    responders.json(err, {message: 'Bad Input'}, 400 )
    return
  }

  const { category, product, first_name, last_name, email, phone_number, image_count } = formData
  const userid = user.id
  const orderData = [userid, category, product, first_name, last_name, email, phone_number, image_count]

  addOrder(orderData, {logger, queryDb}, (err, result) => {
    if(!err) {
      responders.json(result)
    }
    responders.json(null, {message: 'Internal Server Error'}, 500 )
  })
}

export const viewOrderAsCustomer = ({orderId, session, location}, {responders, logger, queryDb}) => {
  const {user} = session

  if(!user || !user.id) {
    responders.redirectForAuthentication(location, "authenticate", logger)
    return
  }

  const { err, formData } = validateCustomerLinkData({orderId})
  if(err) {
    responders.json(err, {message: 'Bad Input'}, 400 )
    return
  }

  const userid = user.id
  const orderData = [userid, formData.orderId]

  viewCustomerOrder(orderData, {logger, queryDb}, (err, result) => {
    if(!err) {
      responders.json(result)
    }
    responders.json(null, {message: 'Internal Server Error'}, 500 )
  })
}

export const finalizeCustomerOrder = ({params, body, userId}, { logger, queryDb }, cb) => {
  const { order_id } = body
  const queryParams = [userId, order_id, 'review_complete']

  updateOrderToFinalize(queryParams, {logger, queryDb}, (err, result) => {
    cb({err, orderData, result})
  })
}
