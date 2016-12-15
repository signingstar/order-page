import React from "react"

const UploadFilesHeader = ({onAlbumRemove, albumCount, albumName, onAddImage, handleNameChange, queued, handleModeChange, mode}) => (
  <div className='upload-header'>
    <div className='album-name'>
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
          <div className='delete-album'>
            <button type='button' onClick={onAlbumRemove} title='Remove Album'><span className='glyphicon glyphicon-trash'></span></button></div>
        : undefined
      }
    </div>
    <div className='action-preview'>
      <div className='action'>
        <div className='upload-action'>
          <button className='queue' type='button' onClick={onAddImage}>
            <span className='glyphicon glyphicon-plus'></span>Add Images
          </button>
        </div>
        <div className='upload-action'>
          <button type='submit' className='upload' disabled={queued ? false : true}>
            <span className='glyphicon glyphicon-upload'></span>Start Upload
          </button>
        </div>
      </div>

      <div className='preview-mode'>
        <button className={mode === 'list' ? 'selected list' : 'list'} type='button' onClick={()=> handleModeChange('list')}>
          <span className='glyphicon glyphicon-th-list'></span>
        </button>
        <button className={mode === 'thumbnail' ? 'selected thumbnail' : 'thumbnail'} type='button' onClick={()=> handleModeChange('thumbnail')}>
          <span className='glyphicon glyphicon-th-large'></span>
        </button>
      </div>
    </div>
  </div>
)

export default UploadFilesHeader
