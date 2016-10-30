const albums = (orderid, {redisClient}, cb) => {
  redisClient.hget(`order_id_${orderid}`, 'albums', (err, res) => {
    if(err) return cb(err)

    cb(null, JSON.parse(res))
  })
}

export default albums
