import React from "react";
import { connect } from "react-redux";

import UploadFiles from "../components/upload_files";
import { uploadImages, setImages, removeImage, setImageUploaded, removeAlbum } from "../actions";

class UploadFilesHandler extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onImageAdd = this.onImageAdd.bind(this)
    this.onImageRemove = this.onImageRemove.bind(this)
    this.onAlbumRemove = this.onAlbumRemove.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const { album, albumId, order, onUpload } = this.props
    const files = album.files
    const formData = new FormData()

    formData.append('order_id', order.id)
    formData.append('album_id', albumId)
    formData.append('album_name', album.name)

    files.map(file => {
      formData.append('images', file)
    })

    uploadImages(formData, () => onUpload(album.id))
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
    const { album, onRemove } = this.props
    const albumId = album.id
    onRemove(file, albumId)
  }

  onAlbumRemove() {
    const { album, onRemoveAlbum } = this.props
    const albumId = album.id

    onRemoveAlbum(albumId)
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

    onRemove: (image) => {
      dispatch(removeImage(image, albumId))
    },

    onRemoveAlbum: () => {
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
