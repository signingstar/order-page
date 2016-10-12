import React, {Component} from "react"
import {connect} from "react-redux"

import ImageTile from "../components/image_tile"

class ImageTileConfiguration extends Component {
  constructor() {
    super()
  }

  render() {
    const { image, pathname } = this.props
    return (
      <ImageTile
        image={image}
        pathname={pathname}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images } = store
  const { index, id } = ownProps
  const image = Object.assign({}, images[index], {index})

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
