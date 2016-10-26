import React from "react"
import Modal from "react-modal"

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

const OrderPreview = ({ onClose, isShowing, content, onClick }) => {
  return (
    <div>
      <a href='javascript:void(0)' onClick={onClick}>Preview</a>
      <Modal
        isOpen={isShowing}
        onRequestClose={onClose}
        style={customStyles}>
        <div dangerouslySetInnerHTML={content} />
      </Modal>
    </div>
  )
}

      export default OrderPreview
