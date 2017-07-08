import React, {Component} from "react"
import {connect} from "react-redux"

import ImageTile from "../components/image_tile/image_tile"

class ImageTileConfiguration extends Component {
  constructor() {
    super()
  }

  render() {
    const { image, pathname, albumId } = this.props
    return (
      <ImageTile
        image={image}
        pathname={pathname}
        albumId={albumId}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images, albums } = store
  const { index, id, albumId } = ownProps

  const image = Object.assign({}, images[id], {index, id})

  return {
    image
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageTileConfiguration)
