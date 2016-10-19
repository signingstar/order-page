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

    const { image, index, order, onUpload } = this.props
    const images = image.files
    const formData = new FormData()

    formData.append('order_id', order.id)
    formData.append('album_id', index)
    formData.append('album_name', image.name)

    images.map(image => {
      formData.append('images', image)
    })

    uploadImages(formData, () => onUpload(image.id))
  }

  handleNameChange(e) {
    const { image } = this.props

    image.name = e.target.value
  }

  onImageAdd(images) {
    const { image, onDrop } = this.props
    const albumId = image.id
    onDrop(images, albumId)
  }

  onImageRemove(e, file) {
    e.stopPropagation()
    const { image, onRemove } = this.props
    const albumId = image.id
    onRemove(image, albumId)
  }

  onAlbumRemove() {
    const { image, onRemoveAlbum } = this.props
    const albumId = image.id
    onRemoveAlbum(albumId)
  }

  render() {
    const acceptFiles = 'image/jpeg, image/png, .ai';

    const { onRemove, image, index } = this.props

    return (
      <UploadFiles
        onDrop={this.onImageAdd}
        accept={acceptFiles}
        onRemove={this.onImageRemove}
        onAlbumRemove={this.onAlbumRemove}
        uploadImage={this.handleSubmit}
        index={index}
        albumName={image.name}
        handleNameChange={this.handleNameChange}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { index } = ownProps

  return {
    order: store.order,
    image: store.image[index]
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
