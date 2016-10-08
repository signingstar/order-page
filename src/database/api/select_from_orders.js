import { products, categories } from "../query/select"

const getStaticDetails = (category, modules, cb) => {
  const { queryDb, logger } = modules
  const callback = cb;
  let selectQuery

  switch(category) {
    case 'products':
      selectQuery = products
      break
    case 'categories':
      selectQuery = categories
      break
  }

  queryDb(selectQuery, [], { logger}, (err, result) => {
    if(err || result.rowCount === 0) {
      logger.error(`[DATABASE] error while fetching the static records`)
      callback(err, result)
      return
    }

    logger.info(`[DATABASE] Static data fetched successfully`)
    callback(err, result.rows)
  })
}

export default getStaticDetails
