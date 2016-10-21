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

    const { album, index, order, onUpload } = this.props
    const files = album.files
    const formData = new FormData()

    formData.append('order_id', order.id)
    formData.append('album_id', index)
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

  onImageAdd(images) {
    const { album, onDrop } = this.props
    const albumId = album.id
    onDrop(images, albumId)
  }

  onImageRemove(e, file) {
    e.stopPropagation()
    const { album, onRemove } = this.props
    const albumId = album.id
    onRemove(album, albumId)
  }

  onAlbumRemove() {
    const { album, onRemoveAlbum } = this.props
    const albumId = album.id
    onRemoveAlbum(albumId)
  }

  render() {
    const acceptFiles = 'image/jpeg, image/png, .ai';

    const { onRemove, album, index } = this.props

    return (
      <UploadFiles
        onDrop={this.onImageAdd}
        accept={acceptFiles}
        onRemove={this.onImageRemove}
        onAlbumRemove={this.onAlbumRemove}
        uploadImage={this.handleSubmit}
        index={index}
        albumName={album.name}
        handleNameChange={this.handleNameChange}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { index } = ownProps

  return {
    order: store.order,
    album: store.image[index]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { index } = ownProps

  return {
    onDrop: (images) => {
      dispatch(setImages(images, index))
    },

    onRemove: (image) => {
      dispatch(removeImage(image, index))
    },

    onRemoveAlbum: () => {
      dispatch(removeAlbum(index))
    },

    onUpload: () => {
      dispatch(setImageUploaded(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFilesHandler)
