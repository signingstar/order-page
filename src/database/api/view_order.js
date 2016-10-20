import { customerOrder, ownerOrder } from "../query/select"

const viewOrder = (query, orderData, modules, cb) => {
  const { queryDb, logger } = modules
  const callback = cb;

  queryDb(query, orderData, { logger}, (err, result) => {
    if(err || result.rowCount === 0) {
      logger.error(`[DATABASE] error while fetching the order`)
      callback(err, result)
      return
    }

    logger.info(`[DATABASE] Order fetched successfully for user: ${orderData[0]}`)
    callback(err, result.rows)
  })
}

export const viewCustomerOrder = (...args) => viewOrder(customerOrder, ...args)

export const viewOwnerOrder = (...args) => viewOrder(ownerOrder, ...args)
