import React, {Component} from "react"
import {connect} from "react-redux"

import ImageModalTile from "../components/image_modal_tile"

class ImageModalTileConfiguration extends Component {
  constructor() {
    super()

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)

    this.state = {}
  }

  componentWillMount() {
    const { state, images, params: {fileName} } = this.props

    if(state) {
      this.setState({index: state.index})
    } else {
      const elemIndex = images.findIndex(entry => entry.filename === fileName)
      this.setState({index: elemIndex})
    }
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

  render() {
    const { onClose, isShowing, images, pathname, params, state, des } = this.props
    const { index } = this.state
    const image = Object.assign({}, images[index], {index})

    return (
      <ImageModalTile
        showNext={this.increment}
        showPrevious={this.decrement}
        onClose={onClose}
        isShowing={isShowing}
        image={image}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images } = store

  return {
    images
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
