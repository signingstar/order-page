import React, {Component} from "react"
import {connect} from "react-redux"
import { spring, presets } from "react-motion"

import FinalizeSelectionComponent from "../components/finalize_selection"

class FinalizeSelection extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.getDefaultStyles = this.getDefaultStyles.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

    this.state = {
      value: '',
      selected: 'all'
    }
  }

  handleChange({target: {value}}) {
    this.setState({value});
  }

  handleSelect(e) {
    this.setState({selected: e.value})
  }

  // actual animation-related logic
  getDefaultStyles() {
    const { images } = this.props
    return images.map(image => ({data: image, key: image.id, style: {height: 0, opacity: 1}}))
  }

  getStyles() {
    const { images } = this.props
    const { value, selected } = this.state;
    return images.filter(({filename}) => {
      return filename !== undefined
    })
    .map((image, i) => {
      return {
        data: image,
        key: image.id,
        style: {
          height: spring(50, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }
    })
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
    }
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    }
  }

  render() {
    const { images } = this.props

    return (
      <FinalizeSelectionComponent
        images={images}
        handleChange={this.handleChange}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        getStyles={this.getStyles}
        getDefaultStyles={this.getDefaultStyles}
        value={this.state.value}
        handleSelect={this.handleSelect}
        selected={this.state.selected}
      />
    )
  }
}

const mapStateToProps = (store) => {
  const { images } = store
  let imageList = []

  for(let album in images) {
    imageList = imageList.concat(images[album].files)
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
)(FinalizeSelection)
