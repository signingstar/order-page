import { LIKES, LIKED } from "../frontend/actions"


//Returns {"3bbb7a37a0f34b3f958582802d8d6dba":{"likes":1,"liked":[],"albumId":"465"}}
const parseReactions = (obj, userId, albumId) => {
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

  return reactionObj
}


const imageReaction = ({order_id, image_id, user_id, album_id}, {redisClient}, cb) => {
  if(!image_id) {
    return cb(null, undefined)
  }

  redisClient.hgetall(`order_id_${order_id}:files:${image_id}`, (err, res) => {
    if(!err && res !== null) {
      cb(null, {[image_id]: parseReactions(res, user_id, album_id)})
    } else {
      cb(err)
    }
  })
}

export default imageReaction
