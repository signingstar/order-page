import React from "react";
import Modal from "react-modal";

import FilesPreviewContent from "./files_preview_contents";

const customStyles = {
  content: {
    top          : '50%',
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    marginRight  : '-50%',
    transform    : 'translate(-50%, -50%)'
  },
  overlay: {}
};

const FilesPreview = ({ onClick, onClose, isShowing, files, modalHeader, label }) => {
  if(files.length === 0) {
    return null;
  }

  return (
    <div className='file-preview'>
      <a href='javascript:void(0)' onClick={onClick}>{label}</a>
      <Modal
        isOpen={isShowing}
        onRequestClose={onClose}
        style={customStyles}>
        <FilesPreviewContent
          files={files}
          onClose={onClose}
          modalHeader={modalHeader} />
      </Modal>
    </div>
  );
}

export default FilesPreview;
