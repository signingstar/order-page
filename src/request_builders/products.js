import async from "async"
import getStaticDetails from "../database/api/select_from_orders"

const products = ({redisClient, queryDb, logger}, cb) => {
  async.waterfall([
    (done) => {
      redisClient.zrangebyscore(['products', 1, 99], (err, res) => {
        done(err, res)
      })
    },
    (productList, done) => {
      if(!productList || productList.length === 0) {
        getStaticDetails('products', {logger, queryDb}, (err, res) => {
          for(let product of res || []) {
            const { id, name, description } = product
            redisClient.zadd(['products', id, JSON.stringify({id, name, description})])
          }

          return cb(err, res)
        })
      } else {
        cb(null, productList.map(product => JSON.parse(product)))
      }
    }
  ],
  (err) => {
    cb(err)
  })
}

export default products
