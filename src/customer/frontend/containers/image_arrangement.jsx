import React, {Component} from "react"
import {connect} from "react-redux"

import ImageTiles from "../components/image_tiles"
import { getImageFeedback, mergeReactions } from "../actions"

class ImageConfiguration extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { onMergeReactions, order_id, mergeStatus } = this.props

    if(mergeStatus) {
      return
    }

    getImageFeedback({order_id}, ({res, err}) => {
      if(!err) {
        return onMergeReactions(res)
      }

      logger.error(err)
    })
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
    order_id: order.id,
    mergeStatus: order.merged
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMergeReactions: (obj) => {
      dispatch(mergeReactions(obj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageConfiguration)
