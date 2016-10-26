export const getPreciseSize = (size) => {
  const unitFactor = 1024 * 1024 * 1024
  return size ? (size > unitFactor ? (size/unitFactor).toFixed(2) + ' GB' : (size/(1024*1024)).toFixed(2) + ' MB') : 0
}

export const imageMapToList = (albums) => {
  if(Object.keys(albums).length === 0) {
    return
  }

  const keys = Object.keys(albums).sort((id1, id2) => albums[id1].priority - albums[id2].priority )
  const imageList = keys.map(albumId => {
    const { id, name, priority, files = [] } = albums[albumId]
    const uploadedFile = files.filter(file => file.uploaded)
    const size = uploadedFile.length > 1 ? uploadedFile.reduce((prev, curr) => prev + curr.size, 0) : (uploadedFile.length > 0 ? uploadedFile[0].size : 0)

    return {id: albumId, priority, name, count: uploadedFile.length, size: getPreciseSize(size) }
  })

  return imageList
}
