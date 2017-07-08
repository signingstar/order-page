import React, {Component} from "react"
import {connect} from "react-redux"
import Link from "react-router-dom/Link"

import ImageModalTile from "../components/image_modal_tile"

class ImageModalTileConfiguration extends Component {
  constructor() {
    super()

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)

    this.state = {}
  }

  componentWillMount() {
    this.updateLocalState(this.props)
  }

  updateLocalState(props) {
    const { state, images, params: {fileName} } = props

    if(state) {
      this.setState({index: state.index})
    } else {
      const elemIndex = images.findIndex(entry => entry.filename === fileName)
      this.setState({index: elemIndex})
    }

  }

  componentWillReceiveProps(nextProps) {
    this.updateLocalState(nextProps)
  }

  increment() {
    const { images } = this.props
    const lastElementIndex = images.length - 1

    if(this.state.index < lastElementIndex ) {
      this.setState({index: this.state.index + 1})
    }
  }

  decrement() {
    if(this.state.index > 0) {
      this.setState({index: this.state.index - 1})
    }
  }

  getNextLink(index, originalUrl, albumId) {
    const { images } = this.props
    const image = images[index + 1]

    return (
      <Link to={{
        pathname: `${originalUrl}/${image.id}`,
        state: { originalUrl, fromModal: true, index: index + 1, albumId }
      }}
      >
        Next
      </Link>
    )
  }

  getPreviousLink(index, originalUrl, albumId) {
    const { images } = this.props
    const image = images[index - 1]

    return (
      <Link to={{
        pathname: `${originalUrl}/${image.id}`,
        state: { originalUrl, fromModal: true, index: index - 1, albumId }
      }}
      >
        Previous
      </Link>
    )
  }

  render() {
    const { onClose, isShowing, images, pathname, params, state, originalUrl, albumId } = this.props
    const { index } = this.state
    const image = Object.assign({}, images[index], {index})

    const previousLink = index > 0 ? this.getPreviousLink(index, originalUrl, albumId) : undefined
    const nextLink = index < images.length - 1 ? this.getNextLink(index, originalUrl, albumId) : undefined

    return (
      <ImageModalTile
        showNext={this.increment}
        showPrevious={this.decrement}
        onClose={onClose}
        isShowing={isShowing}
        image={image}
        previousLink={previousLink}
        nextLink={nextLink}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images } = store
  const { albumId } = ownProps

  let imageList = []
  if(albumId) {
    imageList = images[albumId].files
  } else {
    for(let album in images) {
      imageList = imageList.concat(images[album].files)
    }
  }

  return {
    images: imageList
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
