import React from "react";
import { connect } from "react-redux";

import UploadFiles from "../components/upload_files";
import { uploadImages, setImages, removeImage, setImageUploaded, removeAlbum, updateAlbum, deleteFile } from "../actions";

class UploadFilesHandler extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onImageAdd = this.onImageAdd.bind(this)
    this.onImageRemove = this.onImageRemove.bind(this)
    this.onAlbumRemove = this.onAlbumRemove.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
    this.trackProgress = this.trackProgress.bind(this)
    this.handleCancelUpload = this.handleCancelUpload.bind(this)

    this.state = {
      previewMode: 'list',
      uploadPercent: 0
    }
  }

  trackProgress(e) {
    if(e.lengthComputable){
      var max = e.total
      var current = e.loaded

      const uploadPercent = Math.round((current * 100)/max)
      this.setState({uploadPercent})
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const { album, albumId, order, onUpload } = this.props
    const files = album.files
    const fileNames = []
    const formData = new FormData()

    formData.append('order_id', order.id)
    formData.append('album_id', albumId)
    formData.append('album_name', album.name)

    files.map(file => {
      if(!file.uploaded) {
        formData.append('images', file)
        fileNames.push(file.name)
      }
    })

    formData.append('imagelist', fileNames)

    const uploading = uploadImages(formData, this.trackProgress, () => {
      this.setState({uploading: false})
      onUpload(album.id)
    })
    this.setState({uploading})
  }

  handleCancelUpload() {
    const {uploading} = this.state

    if(uploading) {
      uploading.abort()
    }
  }

  handleModeChange(mode) {
    this.setState({previewMode: mode})
  }

  handleNameChange(e) {
    const { album } = this.props

    album.name = e.target.value
  }

  onImageAdd(acceptedFiles, rejectedFiles) {
    const { album, onDrop } = this.props
    const albumId = album.id
    onDrop(acceptedFiles, albumId)
  }

  onImageRemove(e, file) {
    e.stopPropagation()
    const { order, albumId, removeImageFromStore } = this.props

    if(file.uploaded) {
      deleteFile({order_id: order.id, filename: file.name, album_id: albumId}, ({res, err}) => console.log(res))
    }

    removeImageFromStore(file, albumId)
  }

  onAlbumRemove() {
    const { albumId, removeAlbumFromStore, order } = this.props

    updateAlbum({order_id: order.id, album_id: albumId, action: -1}, ({res, err}) => {
      if(!err && res.count) {
        removeAlbumFromStore(albumId)
      }
    })
  }

  render() {
    const acceptFiles = 'image/jpeg, image/png, .ai';
    const { onRemove, album, albumId, albumCount } = this.props

    return (
      <UploadFiles
        onDrop={this.onImageAdd}
        accept={acceptFiles}
        onRemove={this.onImageRemove}
        onAlbumRemove={this.onAlbumRemove}
        uploadImage={this.handleSubmit}
        albumId={albumId}
        albumName={album.name}
        handleNameChange={this.handleNameChange}
        albumCount={albumCount}
        disablePreview={true}
        handleModeChange={this.handleModeChange}
        mode={this.state.previewMode}
        uploadProgress={this.state.uploadPercent}
        cancelUpload={this.handleCancelUpload}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { albumId } = ownProps

  return {
    order: store.order,
    album: store.image[albumId],
    albumCount: Object.keys(store.image).length
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { albumId } = ownProps

  return {
    onDrop: (images) => {
      dispatch(setImages(images, albumId))
    },

    removeImageFromStore: (image) => {
      dispatch(removeImage(image, albumId))
    },

    removeAlbumFromStore: () => {
      dispatch(removeAlbum(albumId))
    },

    onUpload: () => {
      dispatch(setImageUploaded(albumId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFilesHandler)
