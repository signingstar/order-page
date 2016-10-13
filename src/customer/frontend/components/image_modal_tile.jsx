import React from "react"
import Modal from "react-modal"

import ImageFeedback from "../containers/image_feedback"

const customStyles = {
  content: {
    display      : 'flex',
    top          : '50%',
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    marginRight  : '-50%',
    transform    : 'translate(-50%, -50%)',
    padding      : '0',
    maxHeight    : '100%'
  },
  overlay: {
    position          : 'fixed',
   top               : 0,
   left              : 0,
   right             : 0,
   bottom            : 0,
   backgroundColor   : 'rgba(0, 0, 0, 0.9)'
  }
};

const ImageModalTile = ({ onClose, isShowing, label, showNext, showPrevious, image, nextLink, previousLink }) => {
  const {destination, filename} = image
  const fileSrc = `/${destination}/${filename}`

  return (
    <Modal
      isOpen={isShowing}
      onRequestClose={onClose}
      style={customStyles}>
      <div className='half-screen'>
        <div className='screen-left'>
          <div className='half-screen-image'>
            <img src={fileSrc} />
          </div>
          <div className='image-nav'>
            <div className={previousLink ? 'slide' : 'slide invisible'}>
              {previousLink}
            </div>
            <div className={nextLink ? 'slide' : 'slide invisible'}>
              {nextLink}
            </div>
          </div>
        </div>
        <div className='screen-right'>
          <ImageFeedback image={image} modal={true} onClose={onClose} />
        </div>
      </div>
    </Modal>
  )
}

export default ImageModalTile
