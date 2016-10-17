import React from "react"

const UploadFilesHeader = ({onAlbumRemove, index, albumName, handleNameChange}) => (
  <div className='row upload-header'>
    <div className='album-name large-field required'>
      <label htmlFor="mainAlbum">Album Name</label>
      <input
        type='text'
        defaultValue={albumName}
        required
        name='albumName'
        onBlur={handleNameChange}
      />
    </div>
    {
      index > 0 ?
        <div className='delete-album'><input type='button' value='Remove Album' onClick={onAlbumRemove} /></div>
      : undefined
    }
  </div>
)

export default UploadFilesHeader