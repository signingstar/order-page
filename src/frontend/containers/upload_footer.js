import { connect } from "react-redux"

import UploadFooter from "../components/upload_footer"

const getPreciseSize = (size) => {
  const unitFactor = 1024 * 1024 * 1024
  return size ? (size > unitFactor ? (size/unitFactor).toFixed(2) + ' GB' : (size/(1024*1024)).toFixed(2) + ' MB') : 0
}

const mapStateToProps = (store, ownProps) => {
  const { albumId } = ownProps
  const image = store.image[albumId]
  const { queued, queuedSize, uploaded, uploadedSize } = image

  return {
    queued: queued || 0,
    queuedSize: getPreciseSize(queuedSize),
    uploaded: uploaded || 0,
    uploadedSize: getPreciseSize(uploadedSize)
  }
}

export default connect(
  mapStateToProps
)(UploadFooter)
