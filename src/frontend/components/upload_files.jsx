import React, {Component} from "react";
import Dropzone from "react-dropzone";

import ImageList from "../containers/image_list"
import UploadFooter from "../containers/upload_footer"
import AlbumName from "../components/upload_header"

class UploadFiles extends Component {
  render() {
    const {onDrop, onRemove, onAlbumRemove, handleNameChange, uploadImage , handleModeChange, uploadProgress, cancelUpload} = this.props
    const {accept, albumName, albumId, albumCount, mode} = this.props

    return (
      <div className='file-upload-area'>
        <form onSubmit={uploadImage}>
          <AlbumName
            onAlbumRemove={onAlbumRemove}
            albumCount={albumCount}
            albumName={albumName}
            handleNameChange={handleNameChange}
          />
          <div className='drop-area'>
            <div className='upload-header'>
              <div className='upload-title'>
                Select Files
              </div>
              <div className='preview-mode'>
                <button type='button' onClick={()=> handleModeChange('list')}><span className='list'></span></button>
                <button type='button' onClick={()=> handleModeChange('thumbnail')}><span className='thumbnail'></span></button>
              </div>
            </div>
            <Dropzone
              className='upload-box'
              onDrop={onDrop}
              activeClassName='active'
              rejectClassName='reject'
              accept={accept}
              ref={(node) => { this.dropzone = node }}
              disableClick={true}
            >
              <div className='upload-content'>
                <ImageList onRemove={onRemove} albumId={albumId} mode={mode} />
              </div>
            </Dropzone>
          </div>
          <UploadFooter
            albumId={albumId}
            onAddImage={() => this.dropzone.open()}
            uploadProgress={uploadProgress}
            handleCancel={cancelUpload}
          />
        </form>
      </div>
    )
  }
}

UploadFiles.propTypes = {
  onDrop: React.PropTypes.func,
  onRemove: React.PropTypes.func,
  onAlbumRemove: React.PropTypes.func,
  accept: React.PropTypes.string,
  albumName: React.PropTypes.string,
  handleNameChange: React.PropTypes.func,
  uploadImage: React.PropTypes.func,
  albumId: React.PropTypes.string,
  albumCount: React.PropTypes.number,
  handleModeChange: React.PropTypes.func,
  mode: React.PropTypes.string,
  uploadProgress: React.PropTypes.number,
  cancelUpload: React.PropTypes.func
}

export default UploadFiles
