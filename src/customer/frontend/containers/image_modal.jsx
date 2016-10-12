import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ImageFull from "../containers/image_modal_tile"

class ImageModal extends Component {
  constructor() {
    super()

    this.state = {
      isShowingModal: true
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({isShowingModal: true})
  }

  handleClose() {
    this.setState({isShowingModal: false})
  }

  render() {
    const { images, params, pathname, location: {state} } = this.props
    const {isShowingModal} = this.state
    const { usersHash, orderId, fileName } = params
    const originalUrl = state ? state.originalUrl : `/order/${usersHash}/${orderId}`

    if(!state) return null

    return (
          isShowingModal ?
            <ImageFull
              onClick={this.handleClick}
              onClose={this.handleClose}
              isShowing={true}
              params={params}
              state={state}
            />
          : <Redirect to={{
            pathname: originalUrl
          }} />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    images: store.images
  }
}

export default connect(
  mapStateToProps
) (ImageModal)
