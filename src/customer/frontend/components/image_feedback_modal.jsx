import React from "react"
import Link from "react-router/Link"

import { DISLIKE, LIKE, LOVE, DEFAULT_REACTION } from "../actions"
import ImageReactors from "./reactor_list"

const ImageFeedback = ({ onLike, onDisike, onLove, likes, reactions }) => {
  const liked = reactions[LIKE] || {}
  const disliked = reactions[DISLIKE] || {}
  const loved = reactions[LOVE] || {}

  return (

  <div className="item-action-modal">
    <div className='like'>
      <input type='button' value='Like' onClick={onLike} className={likes === LIKE ? 'selected' : 'enable' }/>
      <ImageReactors users={liked.users} />
    </div>
    <div className='dislike'>
      <input type='button' value='Dislike' onClick={onDisike} className={likes === DISLIKE ? 'selected' : 'enable' }/>
      <ImageReactors users={disliked.users} />
    </div>
    <div className='love'>
      <input type='button' value='Love' onClick={onLove} className={likes === LOVE ? 'selected' : 'enable' }/>
      <ImageReactors users={loved.users} />
    </div>
  </div>
  )
}

export default ImageFeedback
