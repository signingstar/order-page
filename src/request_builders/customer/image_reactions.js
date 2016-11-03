import { LIKES, LIKED } from "../../globals"


//Returns {"3bbb7a37a0f34b3f958582802d8d6dba":{"likes":1,"liked":[],"albumId":"465"}}
const parseReactions = (obj, userId, albumId, image) => {
  if(!obj) {
    return
  }

  let reactionObj = {likes: false, liked: [], albumId}

  for(let index in obj) {
    const { user_name, reaction } = JSON.parse(obj[index])

    if(index === userId) {
      reactionObj[LIKES] = +reaction
      reactionObj[LIKED].push({name: 'You', reaction_type: reaction})

    } else {
      reactionObj[LIKED].push({name: user_name, reaction_type: reaction})
    }
  }

  Object.assign(image, reactionObj)
}


const imageReaction = ({order_id, image_id, user_id, album_id, files}, {redisClient}, cb) => {

  if(image_id) {
    redisClient.hgetall(`order_id_${order_id}:files:${image_id}`, (err, res) => {
      if(!err && res !== null) {
        parseReactions(res, user_id, album_id, files[image_id])
        cb(null)
      } else {
        cb(err)
      }
    })
  } else {
    const filesCount = Object.keys(files).length
    let index = 0

    for(let image_id in files) {
      redisClient.hgetall(`order_id_${order_id}:files:${image_id}`, (err, res) => {
        if(!err && res !== null) {
          parseReactions(res, user_id, album_id, files[image_id])
        }

        if(err) {
          cb(err)
        }

        if(++index > filesCount - 1) {
          cb(null)
        }
      })
    }
  }
}

export default imageReaction
