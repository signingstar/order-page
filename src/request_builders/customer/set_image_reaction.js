const setImageReaction = ({order_id, user, reaction, image_id}, {redisClient}, cb) => {
  const fileToUserMap = {
    user_name: user.first_name,
    reaction
  }

  redisClient.hset(`order_id_${order_id}:files:${image_id}`, [user.id, JSON.stringify(fileToUserMap)])

  const userToFileMap = {
    image_id,
    reaction
  }

  redisClient.zadd([`order_id_${order_id}:users:${user.id}`, +(new Date()), JSON.stringify(userToFileMap)])
}

export default setImageReaction
