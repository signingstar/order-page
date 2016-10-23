import React from "react"

const UploadFilesHeader = ({onAlbumRemove, albumCount, albumName, handleNameChange}) => (
  <div className='row album-name'>
    <div className='large-field required'>
      <label htmlFor="mainAlbum">Album Name</label>
      <input
        type='text'
        defaultValue={albumName}
        required
        name='albumName'
        onBlur={handleNameChange}
        autoFocus
      />
    </div>
    {
      albumCount > 1 ?
        <div className='delete-album'><input type='button' value='Remove Album' onClick={onAlbumRemove} /></div>
      : undefined
    }
  </div>
)

export default UploadFilesHeader
