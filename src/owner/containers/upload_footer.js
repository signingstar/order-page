import { connect } from "react-redux"

import UploadFooter from "../components/upload_footer"
import { getPreciseSize } from "../utils"

const mapStateToProps = (store, ownProps) => {
  const { albumId } = ownProps
  const album = store.albums[albumId]
  const { queued, queuedSize, uploaded, uploadedSize } = album

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
