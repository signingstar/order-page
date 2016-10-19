const imageList = (state = [], {type, params = {}}) => {
  switch(type) {
    case 'POPULATE_IMAGE_LIST':
      return params
  }
  return state
}

export default imageList
