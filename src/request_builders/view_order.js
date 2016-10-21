import async from "async"
import getStaticDetails from "../database/api/select_from_orders"

import StaticRequests from "../request_builder"

const RequestBuilder = ({orderid, userid}, {logger, queryDb, redisClient}) => {
  const { products, categories } = StaticRequests({logger, queryDb, redisClient})
  const orderInfo = (callback) => {
    async.parallel({
      order: (cb) => {
        redisClient.hgetall(`order_id_${orderid}`, (err, res) => {
          if(!err && res) {
            res.albums = JSON.parse(res.albums)
          }
          // TODO: Fetch from db once data is synced
          cb(err, res)
        })
      },
      files: (cb) => {
        redisClient.zrange(`order_id_${orderid}:files`, [0, -1], (err, res) => {
          if(err) return cb(err)

          cb(null, res)
        })
      }
    }, (err, results) => {
      callback(err, results)
    })
  }

  return {products, categories, orderInfo}
}

export default RequestBuilder
