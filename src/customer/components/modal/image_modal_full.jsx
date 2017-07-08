import React from "react"

const ImageModalFullScreen = ({ onClose, showNext, showPrevious, image, nextLink, previousLink, showFullScreen }) => {
  const {destination, filename} = image
  const fileSrc = `/${destination}/${filename}`
  const w = window,
      d = document,
      e = d.documentElement,
      b = d.body,
      x = w.innerWidth  || e.clientWidth  || b.clientWidth,
      y = w.innerHeight || e.clientHeight || b.clientHeight

  return (
    <div className='full-screen'>
      <div className='full-screen-image'>
        <img src={`${fileSrc}_full`} style={{maxWidth: x, maxHeight: y}} />
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
        <button className='glyph' type='button' onClick={showFullScreen}><span className='glyphicon glyphicon-resize-small'></span></button>
      </div>
    </div>
  )
}

export default ImageModalFullScreen
