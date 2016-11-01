import { viewCustomerOrder } from "../../database/api/view_order"

const orderResult = ({user_id, order_id, email}, modules, cb) => {

  viewCustomerOrder([user_id, order_id, email], modules, (err, orderResults) => {
    if(err || !orderResults[0]) cb(err)

    cb(err, Object.assign(orderResults[0], {id: order_id}))
  })
}

export default orderResult
