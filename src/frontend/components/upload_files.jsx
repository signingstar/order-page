import React from "react";
import Dropzone from "react-dropzone";

import ImageList from "../containers/image_list"

const UploadFiles = ({ label, placeholder, onDrop, onRemove, accept, uploadImage, queued, queuedSize, uploaded, uploadedSize }) => {
  let albumName, dropzone

  return (
    <div className='file-upload-area'>
      <form onSubmit={(e) => uploadImage(e, albumName)}>
        <div className='album-name large-field required'>
          <label htmlFor="mainAlbum">Album Name</label>
          <input
            type="text"
            defaultValue='All'
            required
            ref={node => {
              albumName = node
            }}
          />
        </div>
        <Dropzone
          className='upload-box'
          onDrop={onDrop}
          activeClassName='active'
          rejectClassName='reject'
          accept={accept}
          ref={(node) => { dropzone = node }}
        >
          <div className='upload-content'>
            <ImageList onRemove={onRemove} />
          </div>
        </Dropzone>
        <div className='upload-footer'>
          <div className='action'>
            <div className='upload-action '>
              <input type='button' value='Add Images' onClick={()=> dropzone.open()} />
            </div>
            <div className='upload-action '>
              <input type='submit' value='Start Upload' />
            </div>
          </div>
          <div className='status'>
            <div className='queued status'>Queued: {queued} {queuedSize ? `(${queuedSize})` : undefined} </div>
            <div className='uploaded status'>Uploaded: {uploaded} {uploadedSize ? `(${uploadedSize})` : undefined}</div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UploadFiles
