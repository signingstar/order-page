import React, {Component} from "react"
import {connect} from "react-redux"
import Link from "react-router/Link"

import ImageModalTile from "../components/image_modal_tile"
import NavLinks from "../components/nav_links"

class ImageModalTileConfiguration extends Component {
  constructor() {
    super()

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.showFullScreen = this.showFullScreen.bind(this)

    this.state = {
      showFull: false
    }
  }

  componentWillMount() {
    this.updateLocalState(this.props)
  }

  updateLocalState(props) {
    const { state } = props

    if(state) {
      this.setState({index: state.index})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateLocalState(nextProps)
  }

  increment() {
    const { imageIdList } = this.props
    const lastElementIndex = imageIdList.length - 1

    if(typeof this.state.index !== 'undefined' && this.state.index < lastElementIndex ) {
      this.setState({index: this.state.index + 1})
    }
  }

  decrement() {
    if(this.state.index > 0) {
      this.setState({index: this.state.index - 1})
    }
  }

  getNavLink(index, originalUrl, albumId, right) {
    const { imageIdList } = this.props

    if(typeof index === 'undefined' || (right && index >= imageIdList.length-1) || (!right && index <= 0)) {
      return
    }

    const nextImage = imageIdList[right ? index + 1 : index - 1]

    return (
      <NavLinks
        originalUrl={originalUrl}
        imageId={nextImage}
        albumId={albumId}
        index={index}
        next={right}
      />
    )
  }

  showFullScreen() {
    this.setState({showFull: !this.state.showFull})
  }

  render() {
    const { onClose, isShowing, images, pathname, state, originalUrl, albumId, imageIdList, imageId } = this.props
    const { index } = this.state
    const image = index > -1 ? Object.assign({}, images[imageIdList[index]], {index}) : images[imageId]

    const previousLink = this.getNavLink(index, originalUrl, albumId, false)
    const nextLink = this.getNavLink(index, originalUrl, albumId, true)

    return (
      <ImageModalTile
        showNext={this.increment}
        showPrevious={this.decrement}
        onClose={onClose}
        isShowing={isShowing}
        image={image}
        previousLink={previousLink}
        nextLink={nextLink}
        showFullScreen={this.showFullScreen}
        fullScreen={this.state.showFull}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images, albums } = store
  const { albumId } = ownProps

  let imageIdList = []
  if(albumId) {
    imageIdList = albums[albumId].files
  } else {
    for(let album in albums) {
      imageIdList = imageIdList.concat(albums[album].files)
    }
  }

  return {
    images,
    imageIdList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageModalTileConfiguration)
