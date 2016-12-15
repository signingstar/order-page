import { ajax, posting } from "jquery"

export const LIKES = 'likes'
export const LIKED = 'liked'

export const DISLIKE = 0
export const LIKE = 1
export const LOVE = 2
export const DEFAULT_REACTION = -1

export const ALL = 'all'
export const QUALIFIED = 'qualified'
export const UNQUALIFIED = 'unqualified'

export const THUMBNAIL_VIEW = 'thumbnail'
export const LIST_VIEW = 'list'

// ------------------- Customer Portal Actions --------------------------
export const UPDATE_REACTION = 'UPDATE_REACTION'
export const COMMENT_ON_IMAGE = 'COMMENT_ON_IMAGE'
export const MERGE_REACTIONS = 'MERGE_REACTIONS'

export const ADMIN = 5
export const CONTRIBUTOR = 3
export const VISITOR = 1

export const USER_ROLES = {
  [ADMIN]: {shortDescription: 'Admin', description: 'Admin - Full Access'},
  [CONTRIBUTOR]: {shortDescription: 'Contributor', description: 'Contributor - Limited Access'},
  [VISITOR]: {shortDescription: 'Visitor', description: 'Visitor - View Access'}
}

export const updateReaction = (image, value, albumId) => {
  const {id, index} = image

  return {
    type: UPDATE_REACTION,
    params: {id, index, value, albumId}
  }
}

export const commentOnImage = (image, value) => {
  const {id, index} = image

  return {
    type: COMMENT_ON_IMAGE,
    params: {id, index, value}
  }
}

export const mergeReactions = (obj) => {
  return {
    type: MERGE_REACTIONS,
    params: obj
  }
}

export const addUserToStore = (email, role) => {
  return {
    type: 'ADD_USER',
    params: {email, role}
  }
}

export const deleteUserFromStore = (email) => {
  return {
    type: 'DELETE_USER',
    params: {email}
  }
}

export const updateScore = (scores) => {
  return {
    type: 'UPDATE_SCORE',
    params: scores
  }
}

export const updateImageQualification = (imageId, albumId, qualified) => {
  return {
    type: 'UPDATE_QUALIFICATION',
    params: {imageId, albumId, qualified}
  }
}

export const updateReactionFirstLoad = (files, imageSet) => {
  return {
    type: 'FIRST_LOAD',
    params: { files, imageSet }
  }
}

export const updateReactionChangeUser = (files, imageSet, user) => {
  return {
    type: 'CHANGE_USER',
    params: {files, imageSet, user}
  }
}


//------------------------------ AJAX calls -------------------------------

export const sendImageFeedback = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/customer/notify',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({textStatus}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const getImageFeedback = (data, cb) => {
  ajax({
    method: 'GET',
    url: '/order/customer/feedback',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res, textStatus}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const addUser = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/customer/adduser',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res, textStatus}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const deleteUser = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/customer/deleteuser',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res, textStatus}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const updateQualification = (data, cb) => {
  ajax({
    method: 'POST',
    url: '/order/customer/qualify',
    data,
    dataType: 'json'
  })
  .done((res, textStatus) => cb({res, textStatus}))
  .fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))
}

export const fetchImagesByUser = (data, cb) => {
  const posting = post('/order/customer/byuser', data)

  posting.done((res, textStatus) => cb({res}))
  posting.fail((xhr, status, err) => cb({err: xhr.responseJSON, status: xhr.status}))

}
