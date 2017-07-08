import { updateOrderTable, addAdditionalUser, updateAdditionalUser, updateToConfirmOrder, saveAlbumnFile, qualifyImage, updateToFinalizeOrder } from "../query/update"

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

export const persistConfirmOrder = (...args) => updateDatabaseEntry(saveAlbumnFile, ...args)

export const forceQualifyImage = (...args) => updateDatabaseEntry(qualifyImage, ...args)

export const updateOrderToFinalize = (...args) => updateDatabaseEntry(updateToFinalizeOrder, ...args)
