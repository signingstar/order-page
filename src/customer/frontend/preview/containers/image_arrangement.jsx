import React, {Component} from "react"
import {connect} from "react-redux"

import ImageTiles from "../components/image_tiles"

class ImageConfiguration extends Component {
  constructor() {
    super()
  }

  render() {
    const { images, pathname, location: {query} } = this.props
    const album_id = query && query.album ? query.album : undefined
    let imageList = []

    if(album_id) {
      imageList = images[album_id].files
    } else {
      for(let album in images) {
        imageList = imageList.concat(images[album].files)
      }
    }

    return (
      <ImageTiles
        images={imageList}
        pathname={pathname}
        albumId={album_id}
      />
    )
  }
}

const mapStateToProps = (store) => {
  const { images, order } = store

  return {
    images,
    order_id: order.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageConfiguration)
