const parseReactions = (obj, userId, albumId) => {
  if(!obj) {
    return
  }

  let reactionObj = {likes: false, liked: [], albumId}

  for(let index in obj) {
    const jsonObj = JSON.parse(obj[index])

    if(index === userId) {
      reactionObj[LIKES] = +jsonObj.reaction
    } else {
      reactionObj[LIKED].push({name: jsonObj.user_name, reaction_type: jsonObj.reaction})
    }
  }

  return reactionObj
}


const imageReaction = ({orderid, image_id}, {redisClient}, cb) => {
  if(!image_id) {
    return cb(null, undefined)
  }

  redisClient.hgetall(`order_id_${orderid}:files:${image_id}`, (err, res) => {
    if(!err && res !== null) {
      cb(null, {[image_id]: parseReactions(res, user.id)})
    } else {
      cb(err)
    }
  })
}

export default imageReaction
