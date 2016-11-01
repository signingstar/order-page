import { persistConfirmOrder } from "../../database/api/db_updates"

const persistOrder = ({order_name, category, order_info, images, userId}, modules, cb) => {
  const orderId = order_info.id

  const imageMap = {}
  images.map(({id, ...image}, index) => imageMap[id] = Object.assign(image, {index}))

  // const { orderId, order_name = null, category = WEDDING} = order_info
  const queryParams = [userId, orderId, order_name, category, JSON.stringify(imageMap)]

  persistConfirmOrder(queryParams, modules, (err, result) => {
    cb(err, {result: 'success'})
  })
}

export default persistOrder
