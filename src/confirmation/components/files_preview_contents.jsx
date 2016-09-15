import React from "react";

const FilesPreviewContent = ({files, modalHeader, onClose}) => {
  const fileNodes = files.map(file => {
    return (
      <div key={file.name} className='card-box'>
        <div><img src={file.preview}/></div>
        <figcaption><div className='file-caption'>{file.name}</div></figcaption>
      </div>
    )
  });

  return (
    <div className='files-preview-modal'>
      <div>
        <h3>{modalHeader}</h3>
        <div className='close-icon' onClick={onClose}></div>
      </div>
      <div className='files-preview-content'>
        { fileNodes }
      </div>
    </div>
  )
}

export default FilesPreviewContent;
