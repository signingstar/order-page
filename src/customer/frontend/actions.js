import {ajax} from "jquery"

export const LIKES = 'likes'
export const LIKED = 'liked'

export const DISLIKE = 0
export const LIKE = 1
export const LOVE = 2
export const DEFAULT_REACTION = -1

// ------------------- Customer Portal Actions --------------------------
export const UPDATE_REACTION = 'UPDATE_REACTION'
export const COMMENT_ON_IMAGE = 'COMMENT_ON_IMAGE'
export const MERGE_REACTIONS = 'MERGE_REACTIONS'

export const updateReaction = (image, value) => {
  const {id, index} = image

  return {
    type: UPDATE_REACTION,
    params: {id, index, value}
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
