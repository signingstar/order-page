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

    // getImageFeedback({order_id}, ({res, err}) => {
    //   if(!err) {
    //     return onMergeReactions(res)
    //   }
    // })
  }

  render() {
    const { pathname, albums, location: {query} } = this.props
    const album_id = query && query.album ? query.album : undefined
    let imageList = []

    if(album_id) {
      imageList = albums[album_id].files
    } else {
      for(let album in albums) {
        imageList = imageList.concat(albums[album].files)
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
  const { images, order, albums } = store

  return {
    albums,
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
