import { connect } from "react-redux"

import ImageList from "../components/image_list"

const mapStateToProps = (store, ownProps) => {
  const placeholder = 'Drop your image files here...'
  const { albumId } = ownProps

  return {
    images: store.image[albumId].files || [],
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
