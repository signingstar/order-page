import { updateOrderTable, addAdditionalUser, updateAdditionalUser, updateToConfirmOrder, saveFileList } from "../query/update"

const updateDatabaseEntry = (query, params, modules, cb) => {
  const { queryDb, logger } = modules
  const callback = cb;

  queryDb(query, params, { logger}, (err, result) => {
    if(err || result.rowCount === 0) {
      logger.error(`[DATABASE] error while updating Record`)
      callback(err, result)
      return
    }

    logger.info(`[DATABASE] Record updated successfully`)
    callback(err, result.rowCount)
  })
}

export const updateOrder = (...args) => updateDatabaseEntry(updateOrderTable, ...args)

export const addUser = (...args) => updateDatabaseEntry(addAdditionalUser, ...args)

export const updateUser = (...args) => updateDatabaseEntry(updateAdditionalUser, ...args)

export const updateOrderToConfirm = (...args) => updateDatabaseEntry(updateToConfirmOrder, ...args)

export const persistConfirmOrder = (...args) => updateDatabaseEntry(saveFileList, ...args)
