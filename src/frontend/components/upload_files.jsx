import React, {Component} from "react";
import Dropzone from "react-dropzone";

import ImageList from "../containers/image_list"
import UploadFooter from "../containers/upload_footer"
import UploadHeader from "../containers/upload_header"

class UploadFiles extends Component {
  render() {
    const {onDrop, onRemove, onAlbumRemove, handleNameChange, uploadImage , handleModeChange, uploadProgress, cancelUpload, uploading} = this.props
    const {accept, albumId, mode} = this.props

    return (
      <div className='file-upload-area'>
        <form onSubmit={uploadImage}>
          <UploadHeader
            onAlbumRemove={onAlbumRemove}
            albumId={albumId}
            handleNameChange={handleNameChange}
            onAddImage={() => this.dropzone.open()}
          />
          <div className='drop-area'>
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
            uploadProgress={uploadProgress}
            handleCancel={cancelUpload}
            uploading={uploading}
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
