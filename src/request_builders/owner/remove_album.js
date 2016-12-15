import async from "async"
import removeFile from "./remove_file"

const removeAlbum = ({order_id, album_id}, {redisClient}, callback) => {
  async.parallel(
    {
      removeAlbumFiles: (cb) => {
        const key = `order_id_${order_id}:files`
        redisClient.zrange(key, [0, -1], (err, files) => {
          if(err) return cb(err)

          files.forEach(file => album_id === JSON.parse(file).album_id  ? removeFile(redisClient, key, file) : 'noop')
          cb(null)
        })
      },

      removeAlbumFromOrder: (cb) => {
        async.waterfall(
          [
            (done) => {
              redisClient.hget(`order_id_${order_id}`, 'albums', (err, albums) => {
                albums = albums ? JSON.parse(albums) : undefined

                if(albums && albums.length) return done(err, albums)

                done(err)
              })
            },
            (albums, done) => {
              const index = albums.findIndex(album => album.id === album_id)

              if(index > -1) {
                albums.splice(index, 1)

                redisClient.hmset(`order_id_${order_id}`, ['albums', JSON.stringify(albums)], (err, data) => {
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
    },
    (err, results) => {
      callback(err, results.removeAlbumFromOrder)
    }
  )
}

export default removeAlbum
