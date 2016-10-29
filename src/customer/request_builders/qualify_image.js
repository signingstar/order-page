const forceQualifyImage = ({order_id, user, reaction, image_id}, {redisClient}, cb) => {

  const fileToUserMap = {
    user_name: user.first_name,
    reaction
  }

  redisClient.hset(`order_id_${order_id}:files:${image_id}`, ['force_qualify', JSON.stringify(fileToUserMap)], (err, result) => {
    cb(err, result)
  })
}

export default forceQualifyImage
