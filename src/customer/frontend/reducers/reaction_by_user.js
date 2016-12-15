import { LIKES, LIKED, LIKE, DISLIKE, LOVE } from "../actions"

const filteredImages = (files, imageSet, filter, user) => {
  if(user) {
    return files.filter(file => imageSet[file][LIKED].findIndex(({name, reaction_type}) => name === user && +reaction_type === filter) > -1).length
  }
  return files.filter(file => imageSet[file][LIKES] === filter).length
}

const users = (state = [], {type, params={}}) => {
  const { files, imageSet, filter, user } = params

  switch (type) {
    case 'FIRST_LOAD':
      return {
        reaction: LIKE,
        user: 'you',
        count: [filteredImages(files, imageSet, LIKE), filteredImages(files, imageSet, DISLIKE), filteredImages(files, imageSet, LOVE)]
      }
    case 'CHANGE_USER':
      return {
        reaction: LIKE,
        user: user,
        count: [filteredImages(files, imageSet, LIKE, user.value), filteredImages(files, imageSet, DISLIKE, user.value), filteredImages(files, imageSet, LOVE, user.value)]
      }

    default:
      return state
  }
}

export default users
