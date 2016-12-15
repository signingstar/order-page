import async from "async"

const orderInfo = ({order_id}, {redisClient}, callback) => {
  redisClient.hgetall(`order_id_${order_id}`, (err, res) => {
    if(!err && res) {
      res.albums = JSON.parse(res.albums)
    }
    // TODO: Fetch from db once data is synced
    callback(err, res)
  })
}


export default orderInfo
