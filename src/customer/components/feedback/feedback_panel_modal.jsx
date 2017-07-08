import React from "react"
import Link from "react-router-dom/Link"

import { DISLIKE, LIKE, LOVE, DEFAULT_REACTION } from "../../actions"
import ImageReactors from "./reactor_list"

const ImageFeedback = ({ onLike, onDisike, onLove, onClose, likes, reactions }) => {
  const liked = reactions[LIKE] || {}
  const disliked = reactions[DISLIKE] || {}
  const loved = reactions[LOVE] || {}

  return (
  <div>
    <div className='close-icon' >
      <button className='glyph' type='button' onClick={onClose}><span className='glyphicon glyphicon-remove'></span></button>
    </div>
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
  </div>
  )
}

export default ImageFeedback
