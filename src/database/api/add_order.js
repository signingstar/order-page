import { addOrder } from "../query/insert"

const createOrder = (orderData, modules, cb) => {
  const { queryDb, logger } = modules
  const callback = cb;

  queryDb(addOrder, orderData, { logger}, (err, result) => {
    if(err || result.rowCount === 0) {
      logger.error(`[DATABASE] error while adding the order`)
      callback(err, result)
      return
    }

    logger.info(`[DATABASE] Order added successfully for user: ${orderData[0]}`)
    callback(err, result.rows[0])
  })
}

export default createOrder
