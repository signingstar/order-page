import React, {Component} from "react";
import Dropzone from "react-dropzone";

import ImageList from "../containers/image_list"
import UploadFooter from "../containers/upload_footer"
import UploadHeader from "../components/upload_header"

class UploadFiles extends Component {
  render() {
    const {onDrop, onRemove, onAlbumRemove, accept, albumName, handleNameChange, uploadImage , albumId, albumCount} = this.props
    return (
      <div className='file-upload-area'>
        <form onSubmit={uploadImage}>
          <UploadHeader
            onAlbumRemove={onAlbumRemove}
            albumCount={albumCount}
            albumName={albumName}
            handleNameChange={handleNameChange}
          />

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
              <ImageList onRemove={onRemove} albumId={albumId} />
            </div>
          </Dropzone>

          <UploadFooter albumId={albumId} onAddImage={() => this.dropzone.open()}/>
        </form>
      </div>
    )
  }
}

export default UploadFiles
