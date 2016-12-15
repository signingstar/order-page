import React from "react"

const UploadFilesFooter = ({queued, queuedSize, uploaded, uploadedSize, uploadProgress, handleCancel, uploading}) => (
  <div className='upload-footer'>
    <div className='queued'>Images Queued: {queued} {queuedSize ? ` (${queuedSize})` : ''} </div>
    <div className='uploaded'>Images Uploaded: {uploaded} {uploadedSize ? ` (${uploadedSize})` : ''}</div>
    <div className='upload-progress'>
      <div className="progress">
        <div
          className="progress-bar progress-bar-info progress-bar-striped"
          role="progressbar"
          aria-valuenow={uploadProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{
            width: `${uploadProgress}%`,
            minWidth: '1em'
          }}
        >
          <div>{uploadProgress}%</div>
        </div>
      </div>
    </div>
    <div className='upload-action'>
      <button className='cancel' onClick={handleCancel} disabled={uploading ? false : true}>
        <span className='glyphicon glyphicon-ban-circle'></span>Cancel Upload
      </button>
    </div>

  </div>
)

export default UploadFilesFooter
