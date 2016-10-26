const images = (orderid, {redisClient}, cb) => {
  redisClient.zrange(`order_id_${orderid}:files`, [0, -1], (err, res) => {
    if(err) return cb(err)
    const images =  res.map(image => JSON.parse(image))
    cb(err, images)
  })
}

export default images
