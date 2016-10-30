import async from "async"
import getStaticDetails from "../database/api/select_from_orders"

const categories = ({redisClient, queryDb, logger}, cb) => {
  async.waterfall([
    (done) => {
      redisClient.zrangebyscore(['categories', 1, 99], (err, res) => {
        done(err, res)
      })
    },
    (categoryList, done) => {
      if(!categoryList || categoryList.length === 0) {
        getStaticDetails('categories', {logger, queryDb}, (err, res) => {
          for(let category of res || []) {
            const { id, name, description } = category
            redisClient.zadd(['categories', id, JSON.stringify({id, name, description})])
          }

          return cb(err, res)
        })
      } else {
        cb(null, categoryList.map(category => JSON.parse(category)))
      }
    }

  ],
  (err) => {
    cb(err)
  })
}

export default categories
