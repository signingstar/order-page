import React, {Component} from "react"
import {connect} from "react-redux"

import FeedbackPanel from "../components/feedback_panel"
import FeedbackPanelInModel from "../components/feedback_panel_modal"
import { updateReaction, commentOnImage, sendImageFeedback } from "../actions"
import { DISLIKE, LIKE, LOVE, DEFAULT_REACTION } from "../actions"

class ImageFeedbackHandler extends Component {
  constructor() {
    super()

    this.onReactionUpdate = this.onReactionUpdate.bind(this)
    this.compileReactionList = this.compileReactionList.bind(this)
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

  compileReactionList() {
    const { likes, liked } = this.props
    let defaultObj =  { count: 0, users: []}
    const reactionList = {
      [LIKE]: { count: 0, users: []},
      [DISLIKE]: { count: 0, users: []},
      [LOVE]: { count: 0, users: []}
    }
    let reaction

    liked.forEach(like => {
      const {reaction_type} = like

      switch(+reaction_type) {
        case LIKE:
          reaction = reactionList[LIKE]
          reaction.count = reaction.count + 1
          reaction.users.push(like.name)
          break
        case DISLIKE:
          reaction = reactionList[DISLIKE]
          reaction.count = reaction.count + 1
          reaction.users.push(like.name)
          break
        case LOVE:
          reaction = reactionList[LOVE]
          reaction.count = reaction.count + 1
          reaction.users.push(like.name)
          break
      }
    })

    if(likes >= 0 && likes !== false) {
      reactionList[likes].count = reactionList[likes].count + 1
      reactionList[likes].users.unshift('You')
    }

    return reactionList
  }

  render() {
    const { onClose, image: {likes}, modal } = this.props
    const reactionList = this.compileReactionList()

    return (
      modal ?
      <FeedbackPanelInModel
        onLike={() => this.onReactionUpdate(LIKE)}
        onDisike={() => this.onReactionUpdate(DISLIKE)}
        onLove={() => this.onReactionUpdate(LOVE)}
        onComment={this.onCommentImage}
        likes={likes}
        reactions={reactionList}
        onClose={onClose}
      />
      :
      <FeedbackPanel
        onLike={() => this.onReactionUpdate(LIKE)}
        onDisike={() => this.onReactionUpdate(DISLIKE)}
        onLove={() => this.onReactionUpdate(LOVE)}
        onComment={this.onCommentImage}
        likes={likes}
        reactions={reactionList}
      />

    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { order } = store
  const { image: {likes, liked = []} } = ownProps

  return {
    orderId: order.id,
    likes,
    liked
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
