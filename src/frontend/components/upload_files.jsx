import React from "react";
import Dropzone from "react-dropzone";

const DesignFiles = ({ label, placeholder, onDrop, accept }) => (
  <div className='inner-section file-upload-preview'>
    <Dropzone
      className='upload-box'
      onDrop={onDrop}
      activeClassName='active'
      rejectClassName='reject'
      accept={accept}>
      <div className='upload-content'>
        <div>{placeholder}</div>
      </div>
    </Dropzone>
  </div>
)

export default DesignFiles;
