import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ImageModalTile from "../containers/image_modal_tile"

class ImageModal extends Component {
  constructor() {
    super()

    this.state = {}

    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    const { params } = this.props

    if(params.fileName.length > 10) {
      this.setState({isShowingModal: true})
    }
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
    if(fileName.length < 10) return null
    const originalUrl = state ? state.originalUrl : `/order/${usersHash}/${orderId}`
    const albumId = state ? state.albumId : undefined
    if(!state) return null // TODO: WTH

    return (
          isShowingModal ?
            <ImageModalTile
              onClick={this.handleClick}
              onClose={this.handleClose}
              isShowing={isShowingModal}
              params={params}
              state={state}
              originalUrl={originalUrl}
              albumId={albumId}
              imageId={fileName}
            />
          : <Redirect to={{
            pathname: originalUrl,
            query: { album: albumId },
          }} />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
  }
}

export default connect(
  mapStateToProps
) (ImageModal)
