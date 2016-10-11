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
  overlay: {}
};

const ImageModalTile = ({ onClose, isShowing, label, showNext, showPrevious, image }) => {
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
            <div><input type='button' value='Previous' onClick={showPrevious} /></div>
            <div><input type='button' value='Next' onClick={showNext} /></div>
          </div>
        </div>
        <div className='screen-right'>
          <ImageFeedback image={image} />
        </div>
      </div>
    </Modal>
  )
}

export default ImageModalTile
