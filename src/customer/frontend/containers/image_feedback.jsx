import React, {Component} from "react"
import {connect} from "react-redux"

import ImageFeedback from "../components/image_feedback"
import { updateReaction, commentOnImage, sendImageFeedback } from "../actions"
import { DISLIKE, LIKE, LOVE, DEFAULT_REACTION } from "../actions"

class ImageFeedbackHandler extends Component {
  constructor() {
    super()

    this.onReactionUpdate = this.onReactionUpdate.bind(this)
  }

  onReactionUpdate(reaction) {
    const { image, onReaction, orderId } = this.props
    const { likes: oldReaction } = image

    const newReaction = oldReaction === reaction ? DEFAULT_REACTION : reaction

    onReaction(image, newReaction)

    const postData = {
      reaction_type: newReaction,
      image_uuid: image.id,
      order_id: orderId,
      index: image.index
    }

    sendImageFeedback(postData, ({status, textStatus}) => console.log(status || textStatus))
  }

  onCommentImage() {

  }

  render() {
    const { image: {likes} } = this.props

    return (
      <ImageFeedback
        onLike={() => this.onReactionUpdate(LIKE)}
        onDisike={() => this.onReactionUpdate(DISLIKE)}
        onLove={() => this.onReactionUpdate(LOVE)}
        onComment={this.onCommentImage}
        likes={likes}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { order } = store
  return {
    orderId: order.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReaction: (image, value) => {
      dispatch(updateReaction(image, value))
    },

    onComment: (image, comment) => {
      dispatch(commentOnImage(image, comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageFeedbackHandler)
