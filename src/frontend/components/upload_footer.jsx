import React from "react"

const UploadFilesFooter = ({queued, queuedSize, uploaded, uploadedSize, onAddImage, uploadProgress, handleCancel}) => (
  <div className='upload-footer'>
    <div className='action'>
      <div className='upload-action'>
        <input className='queue' type='button' value='Add Images' onClick={onAddImage} />
      </div>
      <div className='upload-action'>
        <input className='upload' type='submit' value='Start Upload' disabled={queued ? false : true} />
      </div>
    </div>
    <div className='status'>
      <div className='queued'>Queued: {queued} {queuedSize ? ` (${queuedSize})` : undefined} </div>
      <div className='uploaded'>Uploaded: {uploaded} {uploadedSize ? ` (${uploadedSize})` : undefined}</div>
      <div>{uploadProgress}</div>
      <div><input type='button' onClick={handleCancel} value='Cancel' /></div>
    </div>
  </div>
)

export default UploadFilesFooter
