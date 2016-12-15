import async from "async"
import removeFile from "./remove_file"

export const searchImage = ({order_id, album_id, filename}, {redisClient}, cb) => {
  const key = `order_id_${order_id}:files`

  async.waterfall(
    [
      (done) => {
        redisClient.zrange(key, [0,-1], (err, files) => {
          done(err, files)
        })
      },
      (files, done) => {
        const fileObj = files.find(file => {
          const jsonFile = JSON.parse(file)
          return filename === jsonFile.originalname  && jsonFile.album_id === album_id
        })

        if(fileObj) {
          removeFile(redisClient, key, fileObj, (err, data) => {
            if(err) return done(err)
            done(null, {count: 1})
          })
        } else {
          done(null, {count: 0})
        }
      },
      (updateCount, done) => {
        cb(null, updateCount)
      }
    ],
    (err) => cb(err)
  )
}

export default searchImage
