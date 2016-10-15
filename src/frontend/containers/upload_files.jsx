import React from "react";
import { connect } from "react-redux";

import DesignFiles from "../components/upload_files";
import { uploadImages, setImages, removeImage, setImageUploaded } from "../actions";

class UploadFiles extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onImageAdd = this.onImageAdd.bind(this)
    this.onImageRemove = this.onImageRemove.bind(this)

    this.state = {
      queued: 0,
      queuedSize: 0,
      uploaded: 0,
      uploadedSize: 0
    }
  }

  handleSubmit(e, input) {
    e.preventDefault()

    let albumName = input.value
    if (!albumName.trim()) {
      return
    }

    albumName = albumName.trim()

    const { image, order, onUpload } = this.props
    const images = image.files
    const formData = new FormData()
    let imageSize = 0

    formData.append('order_id', order && order.id ? order.id : 64)
    formData.append('album_name', albumName)

    images.map(image => {
      formData.append('images', image)
      imageSize += image.size
    })

    uploadImages(formData, onUpload)
  }

  onImageAdd(images) {
    const { onDrop } = this.props
    onDrop(images)
  }

  onImageRemove(e, image) {
    const { onRemove } = this.props
    onRemove(e, image)
  }

  getPreciseSize(size) {
    const unitFactor = 1024 * 1024 * 1024
    return size ? (size > unitFactor ? (size/unitFactor).toFixed(2) + ' GB' : (size/(1024*1024)).toFixed(2) + ' MB') : 0
  }

  render() {
    const label = 'Print Design';
    const placeholder = 'Drop your files here, or click anywhere in this box to select files to upload';
    const acceptFiles = 'image/jpeg, image/png, .ai';

    const { onRemove, image } = this.props
    const { queued, queuedSize, uploaded, uploadedSize } = image

    return (
      <DesignFiles
        label={label}
        placeholder={placeholder}
        onDrop={this.onImageAdd}
        accept={acceptFiles}
        queued={queued || 0}
        queuedSize={this.getPreciseSize(queuedSize)}
        uploaded={uploaded || 0}
        uploadedSize={this.getPreciseSize(uploadedSize)}
        onRemove={this.onImageRemove}
        uploadImage={this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    image: store.image
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDrop: (images) => {
      dispatch(setImages(images))
    },

    onRemove: (e, image) => {
      e.stopPropagation()
      dispatch(removeImage(image))
    },

    onUpload: () => {
      dispatch(setImageUploaded())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFiles);
