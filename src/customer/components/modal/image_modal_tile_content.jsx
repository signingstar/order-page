import React from "react"

import ImageFeedback from "../../containers/image_feedback"

const ImageModalTileContent = ({ onClose, showNext, showPrevious, image, nextLink, previousLink, showFullScreen }) => {
  const {destination, filename} = image
  const fileSrc = `/${destination}/${filename}`

  return (
    <div className='half-screen'>
      <div className='screen-left'>
        <div className='half-screen-image'>
          <img src={`${fileSrc}_modal`} />
        </div>
        <div className='image-nav'>
          <div className={previousLink ? 'slide' : 'slide invisible'}>
            {previousLink}
          </div>
          <div className={nextLink ? 'slide' : 'slide invisible'}>
            {nextLink}
          </div>
        </div>
        <div className='fullscreen' >
          <button className='glyph' type='button' onClick={showFullScreen}><span className='glyphicon glyphicon-resize-full'></span></button>
        </div>
      </div>
      <div className='screen-right'>
        <ImageFeedback image={image} modal={true} onClose={onClose} />
      </div>
    </div>
  )
}

export default ImageModalTileContent
