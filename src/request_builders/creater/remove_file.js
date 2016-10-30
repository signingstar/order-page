import fs from "fs"

const removeFile = (redisClient, key, entry, cb) => {
  const {destination, filename} = JSON.parse(entry)
  const filePath = `${destination}/${filename}`

  fs.unlink(filePath, (err) => {
    if(!err) {
      redisClient.zrem(key, entry, (err, data) => {
        if(cb) cb(err, {count: 1})
      })
    }
  })
}

export default removeFile
