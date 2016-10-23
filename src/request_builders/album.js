import async from "async"
import fs from "fs"

const START_PRIORITY = 100
const END_PRIORITY = 1000
const STEP_PRIORITY = 20

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const addAlbum = ({order_id}, {redisClient}, cb) => {
  async.waterfall(
    [
      (done) => {
        redisClient.hgetall(`order_id_${order_id}`, (err, orderData) => { //TODO fetch albums directly
          if(err) return done(err)
          done(err, orderData || {})
        })
      },
      (orderData, done) => {
        let { albums } = orderData
        albums = albums ? JSON.parse(albums) : []

        const id = getRandomInt(START_PRIORITY, END_PRIORITY).toString()
        const name = `Album-${id}`
        const priority = albums.length ? albums[albums.length - 1].priority + STEP_PRIORITY : START_PRIORITY

        albums.push({id, name, priority})

        redisClient.hmset(`order_id_${order_id}`, ['albums', JSON.stringify(albums)], (err, data) => {
          if(err) return done(err)
          done(null, {id, name, priority})
        })
      },
      (albumData, done) => {
        cb(null, albumData)
      }
    ],
    (err) => cb(err)
  )
}

export const updateAlbum = ({order_id, mapping}, {redisClient}, cb) => {
  async.waterfall(
    [
      (done) => {
        redisClient.hget(`order_id_${order_id}`, 'albums', (err, albums) => { //TODO fetch albums directly
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

export const removeAlbum = ({order_id, album_id}, {redisClient}, callback) => {

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

export const removeImage = ({order_id, album_id, filename}, {redisClient}, cb) => {
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
