import { viewCustomerOrder } from "../query/select"

const viewOrder = (orderData, modules, cb) => {
  const { queryDb, logger } = modules
  const callback = cb;

  queryDb(viewCustomerOrder, orderData, { logger}, (err, result) => {
    if(err || result.rowCount === 0) {
      logger.error(`[DATABASE] error while fetching the order`)
      callback(err, result)
      return
    }

    logger.info(`[DATABASE] Order fetched successfully for user: ${orderData[0]}`)
    callback(err, result.rows[0])
  })
}

export default viewOrder
