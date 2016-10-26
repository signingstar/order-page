import React, {Component} from "react"
import {connect} from "react-redux"

import ImageTile from "../components/image_tile"

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
  const { images } = store
  const { index, id, albumId } = ownProps

  let imageList = []
  if(albumId) {
    imageList = images[albumId].files
  } else {
    for(let album in images) {
      imageList = imageList.concat(images[album].files)
    }
  }

  const image = Object.assign({}, imageList[index], {index})

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
