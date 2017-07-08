import React from "react"
import Modal from "react-modal"

import ImageModalContent from "./image_modal_tile_content"
import ImageModalFull from "./image_modal_full"

const customStyles = {
  content: {
    border       :  0,
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

const ImageModalTile = (modalparams) => {
  const { onClose, isShowing, fullScreen } = modalparams

  return (
    <Modal
      isOpen={isShowing}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Tile"
    >
      {
        fullScreen ?
          <ImageModalFull {...modalparams} />
        :
        <ImageModalContent {...modalparams} />
      }
    </Modal>
  )
}

export default ImageModalTile
