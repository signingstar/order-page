import React, {Component} from "react"
import {connect} from "react-redux"
import { spring, presets } from "react-motion"

import FinalizeSelectionComponent from "../components/finalize_selection"
import { updateScore, updateImageQualification, updateQualification } from "../actions"
import { DISLIKE, LIKE, LOVE, ALL, QUALIFIED, UNQUALIFIED } from "../actions"

const scoreMap = { [LIKE]: 1, [DISLIKE]: -1, [LOVE]: 2}

class FinalizeSelection extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.getDefaultStyles = this.getDefaultStyles.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.assignScoreToImages = this.assignScoreToImages.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
    this.getQualifiedImages = this.getQualifiedImages.bind(this)
    this.qualifyImage = this.qualifyImage.bind(this)
    this.unqualifyImage = this.unqualifyImage.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)

    this.state = {
      value: '',
      filter: QUALIFIED,
      previewMode: 'thumbnail'
    }
  }

  componentWillMount() {
    this.assignScoreToImages()
    this.setState({qualifiedCount: this.getQualifiedImages().length})
  }

  handleChange({target: {value}}) {
    this.setState({value});
  }

  handleModeChange(mode) {
    this.setState({previewMode: mode})
  }

  // actual animation-related logic
  getDefaultStyles() {
    const { images } = this.props
    return images.map(image => ({data: image, key: image.id, style: {height: 0, opacity: 1}}))
  }

  isQualifyingImage(filter, score, forceQualified = {}) {
    const {reaction_type} = forceQualified

    switch(filter) {
      case ALL:
        return true
      case QUALIFIED:
        return reaction_type === QUALIFIED || (reaction_type !== UNQUALIFIED && score > 0)
      case UNQUALIFIED:
        return reaction_type === UNQUALIFIED || (reaction_type !== QUALIFIED && !score)
    }

    return true
  }

  getQualifiedImages() {
    const { images } = this.props

    return images.filter(image => {
      const {filename, score, forceQualify} = image
      const qualified = this.isQualifyingImage(QUALIFIED, score, forceQualify)
      image.qualified = qualified
      return qualified
    })
  }

  getStyles() {
    const { images } = this.props
    const { value, filter, previewMode } = this.state;
    const filteredImages = images.filter(({filename, score, forceQualify}) => {
      return this.isQualifyingImage(filter, score, forceQualify)
    })

    return filteredImages.map((image, i) => {
      return {
        data: Object.assign({}, image, {filter}),
        key: image.id,
        style: {
          height: spring(previewMode === 'thumbnail' ? 95 : 40, presets.gentle),
          opacity: spring(1, presets.gentle)
        }
      }
    })
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
      backgroundColor: '#fff'
    }
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
    }
  }

  assignScoreToImages() {
    const { images, updateScoreInStore } = this.props
    const scores = {}

    images.forEach(image => {
      const { id, score, liked, album_id } = image
      let tempScore = 0

      if(!image.liked) {
        return
      }

      image.liked.forEach(like => {
        tempScore += scoreMap[+like.reaction_type]
      })

      if(score !== tempScore) {
        scores[image.id] = {score: tempScore, album_id}
      }
    })

    if(Object.keys(scores)) {
      updateScoreInStore(scores)
    }
  }

  updateFilter(filter) {
    this.setState({filter})
  }

  componentWillReceiveProps() {
    this.setState({qualifiedCount: this.getQualifiedImages().length})
  }

  qualifyImage(imageId, albumId) {
    const { updateImageQualificationInStore, order_id } = this.props
    updateImageQualificationInStore(imageId, albumId, QUALIFIED)
    updateQualification({image_id: imageId, order_id, reaction: QUALIFIED}, ({res, err}) => console.log(res))
  }

  unqualifyImage(imageId, albumId) {
    const { updateImageQualificationInStore, order_id } = this.props
    updateImageQualificationInStore(imageId, albumId, UNQUALIFIED)
    updateQualification({image_id: imageId, order_id, reaction: UNQUALIFIED}, ({res, err}) => console.log(res))
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
        updateFilter={this.updateFilter}
        qualifiedCount={this.state.qualifiedCount}
        totalCount={images.length}
        qualifyImage={this.qualifyImage}
        unqualifyImage={this.unqualifyImage}
        filter={this.state.filter}
        handleModeChange={this.handleModeChange}
        viewMode={this.state.previewMode}
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
    order_id: store.order.id,
    images: imageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateScoreInStore: (scores) => {
      dispatch(updateScore(scores))
    },

    updateImageQualificationInStore: (imageId, albumId, qualify) => {
      dispatch(updateImageQualification(imageId, albumId, qualify))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalizeSelection)
