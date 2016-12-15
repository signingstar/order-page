import { connect } from "react-redux"

import ImageList from "../components/image_list"

const mapStateToProps = (store, ownProps) => {
  const placeholder = 'Drop your image files here...'
  const { albumId } = ownProps
  const album = store.albums[albumId]

  return {
    images: album.files || [],
    placeholder
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRemove: (e, name) => {
      ownProps.onRemove(e, name)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageList)
