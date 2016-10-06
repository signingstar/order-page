import { updateOrderTable } from "../query/update"

const updateDatabaseEntry = (params, modules, cb) => {
  const { queryDb, logger } = modules
  const callback = cb;

  queryDb(updateOrderTable, params, { logger}, (err, result) => {
    if(err || result.rowCount === 0) {
      logger.error(`[DATABASE] error while updating Record`)
      callback(err, result)
      return
    }

    logger.info(`[DATABASE] Record updated successfully`)
    callback(err, result.rowCount)
  })
}

export const updateOrder = (...args) => updateDatabaseEntry(...args)
