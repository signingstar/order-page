import React from "react"
import Link from "react-router/Link"

const ImageFeedback = ({ onLike, onDisike, onLove, likes }) => (
  <div className="item-action">
    <div className='like'>
      <input type='button' value='Like' onClick={onLike} className={likes === 1 ? 'selected' : 'enable' }/>
    </div>
    <div className='dislike'>
      <input type='button' value='Dislike' onClick={onDisike} className={likes === 0 ? 'selected' : 'enable' }/>
    </div>
    <div className='love'>
      <input type='button' value='Love' onClick={onLove} className={likes === 2 ? 'selected' : 'enable' }/>
    </div>
  </div>
)

export default ImageFeedback
