import { viewCustomerOrder } from "../../database/api/view_order"

const orderResult = (orderQueryData, modules, cb) => {
  viewCustomerOrder(orderQueryData, modules, (err, orderResults) => {
    if(err || !orderResults[0]) cb(err)

    // orderResult.id = orderid

    cb(err, orderResults[0])
  })
}

export default orderResult
