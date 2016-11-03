import { forceQualifyImage } from "../../database/api/db_updates"

const qualifyImage = ({order_id, user, reaction, image_id}, {queryDb, logger}, cb) => {

  const fileToUserMap = {
    user_name: user.first_name,
    reaction
  }

  forceQualifyImage([order_id, image_id, fileToUserMap], {queryDb, logger}, (err, result) => {
    cb(err, result)
  })

  // redisClient.hset(`order_id_${order_id}:files:${image_id}`, ['force_qualify', JSON.stringify(fileToUserMap)], (err, result) => {
  //   cb(err, result)
  // })
}

export default qualifyImage
