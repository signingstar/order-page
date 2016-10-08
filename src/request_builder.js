import async from "async"
import getStaticDetails from "./database/api/select_from_orders"

const RequestBuilder = ({logger, queryDb, redisClient}) => {
  const products = (cb) => {
    async.waterfall([
      (done) => {
        redisClient.zrangebyscore(['products', 1, 99], (err, res) => {
          done(err, res)
        })
      },
      (products, done) => {
        if(!products || products.length === 0) {
          getStaticDetails('products', {logger, queryDb}, (err, res) => {
            for(let product of res || []) {
              const { id, name, description } = product
              redisClient.zadd(['products', id, JSON.stringify({id, name, description})])
            }

            return cb(err, res)
          })
        } else {
          cb(null, products.map(product => JSON.parse(product)))
        }
      }

    ],
    (err) => {
      cb(err)
    })
  }

  const categories = (cb) => {
    async.waterfall([
      (done) => {
        redisClient.zrangebyscore(['categories', 1, 99], (err, res) => {
          done(err, res)
        })
      },
      (categories, done) => {
        if(!categories || categories.length === 0) {
          getStaticDetails('categories', {logger, queryDb}, (err, res) => {
            for(let category of res || []) {
              const { id, name, description } = category
              redisClient.zadd(['categories', id, JSON.stringify({id, name, description})])
            }

            return cb(err, res)
          })
        } else {
          cb(null, categories.map(category => JSON.parse(category)))
        }
      }

    ],
    (err) => {
      cb(err)
    })
  }

  return {products, categories}
}

export default RequestBuilder
