import React from "react"
import Link from "react-router/Link"

import { DISLIKE, LIKE, LOVE, DEFAULT_REACTION } from "../actions"

const ImageFeedback = ({ onLike, onDisike, onLove, likes, reactions }) => {
  const liked = reactions[LIKE] || {}
  const disliked = reactions[DISLIKE] || {}
  const loved = reactions[LOVE] || {}

  return (

  <div className="item-action">
    <div className='like'>
      <input type='button' value='Like' onClick={onLike} className={likes === LIKE ? 'selected' : 'enable' }/>
      <div>{liked.count}</div>
    </div>
    <div className='dislike'>
      <input type='button' value='Dislike' onClick={onDisike} className={likes === DISLIKE ? 'selected' : 'enable' }/>
      <div>{disliked.count}</div>
    </div>
    <div className='love'>
      <input type='button' value='Love' onClick={onLove} className={likes === LOVE ? 'selected' : 'enable' }/>
      <div>{loved.count}</div>
    </div>
  </div>
  )
}

export default ImageFeedback
