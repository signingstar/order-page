import React from "react"
import { connect } from "react-redux"

import ImageList from "../components/image_list"
import {removeImage} from "../actions"

const mapStateToProps = (store) => {
  const placeholder = 'Drop your image files here...'

  return {
    images: store.image.files || [],
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
