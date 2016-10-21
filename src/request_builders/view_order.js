import async from "async"
import getStaticDetails from "../database/api/select_from_orders"

import StaticRequests from "../request_builder"

const RequestBuilder = ({orderid, userid}, {logger, queryDb, redisClient}) => {
  const { products, categories } = StaticRequests({logger, queryDb, redisClient})
  const order = (cb) => {
    async.parallel({

    })
    async.waterfall([
      (done) => {
        redisClient.hgetall(`order_id_${orderid}`, (err, res) => {
          if(!err && res) {
            res.albums = JSON.parse(res.albums)
          }
          done(err, res)
        })
      },
      (order, done) => {
        if(!order || order.length === 0) {
          // TODO: Fetch from db once data is synced
        } else {
          cb(null, order)
        }
      }
    ],
    (err) => {
      cb(err)
    })
  }

  return {products, categories, order}
}

export default RequestBuilder
