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
    const { params, pathname, location: {state} } = this.props
    const {isShowingModal} = this.state
    const { usersHash, orderId, fileName } = params
    const originalUrl = state ? state.originalUrl : `/order/${usersHash}/${orderId}`
    const albumId = state ? state.albumId : undefined
    if(!state) return null

    return (
          isShowingModal ?
            <ImageFull
              onClick={this.handleClick}
              onClose={this.handleClose}
              isShowing={isShowingModal}
              params={params}
              state={state}
              originalUrl={originalUrl}
              albumId={albumId}
            />
          : <Redirect to={{
            pathname: originalUrl,
            query: { album: albumId },
          }} />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images } = store
  let imageList = []
  for(let album in images) {
    imageList = imageList.concat(images[album].files)
  }

  return {
    images: imageList
  }
}

export default connect(
  mapStateToProps
) (ImageModal)
