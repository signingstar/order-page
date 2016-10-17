import React from "react"

const UploadFilesFooter = ({queued, queuedSize, uploaded, uploadedSize, onAddImage}) => (
  <div className='upload-footer'>
    <div className='action'>
      <div className='upload-action'>
        <input type='button' value='Add Images' onClick={onAddImage} />
      </div>
      <div className='upload-action'>
        <input type='submit' value='Start Upload' disabled={queued ? false : true} />
      </div>
    </div>
    <div className='status'>
      <div className='queued status'>Queued: {queued} {queuedSize ? ` (${queuedSize})` : undefined} </div>
      <div className='uploaded status'>Uploaded: {uploaded} {uploadedSize ? ` (${uploadedSize})` : undefined}</div>
    </div>
  </div>
)

export default UploadFilesFooter
