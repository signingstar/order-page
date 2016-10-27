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
      <button
        type='button'
        onClick={onLike}
        className={likes === LIKE ? 'selected' : 'enable'}
        title={likes === LIKE ? 'You like it' : 'Like'}
      >
        <span className='glyphicon glyphicon-thumbs-up icon'></span>
      </button>
      <span className='number'>{liked.count}</span>
    </div>
    <div className='dislike'>
      <button
        type='button'
        onClick={onDisike}
        className={likes === DISLIKE ? 'selected' : 'enable' }
        title={likes === DISLIKE ? 'You dislike it' : 'Dislike' }
      >
        <span className='glyphicon glyphicon-thumbs-down icon'></span>
      </button>
      <span className='number'>{disliked.count}</span>
    </div>
    <div className='love'>
      <button
        type='button'
        onClick={onLove}
        className={likes === LOVE ? 'selected' : 'enable' }
        title={likes === LOVE ? 'You Love It' : 'Love' }
      >
        <span className={`glyphicon icon ${likes === LOVE ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}></span>
      </button>
      <span className='number'>{loved.count}</span>
    </div>
  </div>
  )
}

export default ImageFeedback
