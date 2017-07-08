import React from "react"
import Link from "react-router-dom/Link"

import { DISLIKE, LIKE, LOVE, DEFAULT_REACTION } from "../../actions"

const ImageFeedback = ({ onLike, onDisike, onLove, likes, reactions }) => {
  const liked = reactions[LIKE] || {}
  const disliked = reactions[DISLIKE] || {}
  const loved = reactions[LOVE] || {}
  const iLike = likes === LIKE
  const iDislike = likes === DISLIKE
  const iLove = likes === LOVE

  return (

  <div className="item-action">
    <div className='like'>
      <button
        type='button'
        onClick={onLike}
        className={iLike ? 'selected' : 'enable'}
        title={iLike ? 'You like it' : 'Like'}
      >
        <span className='glyphicon glyphicon-thumbs-up icon'></span>
      </button>
      <span className='number'>{liked.count}</span>
    </div>
    <div className='dislike'>
      <button
        type='button'
        onClick={onDisike}
        className={iDislike ? 'selected' : 'enable' }
        title={iDislike ? 'You dislike it' : 'Dislike' }
      >
        <span className='glyphicon glyphicon-thumbs-down icon'></span>
      </button>
      <span className='number'>{disliked.count}</span>
    </div>
    <div className='love'>
      <button
        type='button'
        onClick={onLove}
        className={iLove ? 'selected' : 'enable' }
        title={iLove? 'You Love It' : 'Love' }
      >
        <span className={`glyphicon icon ${iLove ? 'glyphicon-heart' : 'glyphicon-heart-empty'}`}></span>
      </button>
      <span className='number'>{loved.count}</span>
    </div>
  </div>
  )
}

export default ImageFeedback
