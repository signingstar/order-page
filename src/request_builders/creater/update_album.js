import async from "async"

const updateAlbum = ({order_id, mapping}, {redisClient}, cb) => {
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
        let updateCount = 0
        albums.forEach(album => {
          const { id, priority } = album

          if(mapping[id]) {
            album.priority = mapping[id]
            updateCount++
          }
        })


        if(updateCount) {
          albums.sort((prev, curr) => prev.priority - curr.priority)

          redisClient.hmset(`order_id_${order_id}`, ['albums', JSON.stringify(albums)], (err, data) => {
            if(err) return done(err)
            done(null, {count: updateCount})
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

export default updateAlbum
