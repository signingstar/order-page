import { connect } from "react-redux"

import UploadHeader from "../components/upload_header"

const mapStateToProps = (store, ownProps) => {
  const { albumId } = ownProps
  const album = store.albums[albumId]
  const { name, queued } = album

  return {
    queued: queued || 0,
    albumCount: Object.keys(store.albums).length,
    albumName: name
  }
}

export default connect(
  mapStateToProps
)(UploadHeader)
