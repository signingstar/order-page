import React, {Component} from "react"
import {connect} from "react-redux"

import ImageTiles from "../components/image_tiles"
import { getImageFeedback, mergeReactions } from "../actions"

class ImageConfiguration extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { onMergeReactions, order_id } = this.props
    getImageFeedback({order_id}, ({res, err}) => {
      if(!err) {
        return onMergeReactions(res)
      }

      logger.error(err)
    })
  }

  render() {
    const { images, pathname } = this.props
    return (
      <ImageTiles
        images={images}
        pathname={pathname}
      />
    )
  }
}

const mapStateToProps = (store) => {
  return {
    images: store.images,
    order_id: store.order.id
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
