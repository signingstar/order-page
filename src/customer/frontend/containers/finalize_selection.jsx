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
    const { images, imageIdList, albums } = this.props

    return imageIdList.map(imageId => ({data: Object.assign({}, images[imageId], {imageId, albumName: albums[images[imageId]]}), key: imageId, style: {height: 0, opacity: 1}}))
  }

  isQualifyingImage(filter, score, forceQualified = {}) {
    const {reaction} = forceQualified

    switch(filter) {
      case ALL:
        return true
      case QUALIFIED:
        return reaction === QUALIFIED || (reaction !== UNQUALIFIED && score > 0)
      case UNQUALIFIED:
        return reaction === UNQUALIFIED || (reaction !== QUALIFIED && (!score || score < 1))
    }

    return true
  }

  getQualifiedImages() {
    const { images, imageIdList } = this.props

    return imageIdList.filter(imageId => {
      const image = images[imageId]
      const {filename, score, force_qualify} = image
      const qualified = this.isQualifyingImage(QUALIFIED, score, force_qualify)
      image.qualified = qualified
      return qualified
    })
  }

  getStyles() {
    const { images, imageIdList, albums } = this.props
    const { value, filter, previewMode } = this.state;

    return imageIdList.filter(imageId => {
      const { score, force_qualify} = images[imageId]
      return this.isQualifyingImage(filter, score, force_qualify)
    })
    .map((imageId, i) => {
      const image = images[imageId]
      const albumName = albums[image.album_id].name
      return {
        data: Object.assign({}, image, {filter, imageId, albumName}),
        key: imageId,
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
    const { images, imageIdList, updateScoreInStore } = this.props
    const scores = {}

    imageIdList.forEach(imageId => {
      const image = images[imageId]
      const { score, liked, album_id } = image
      let tempScore = 0

      if(!image.liked) {
        return
      }

      image.liked.forEach(like => {
        tempScore += scoreMap[+like.reaction_type]
      })

      if(score !== tempScore) {
        scores[imageId] = {score: tempScore, album_id}
      }
    })

    if(Object.keys(scores)) {
      updateScoreInStore(scores)
    }
  }

  updateFilter(filter) {
    this.setState({filter})
  }

  qualifyImage(imageId, albumId) {
    const { updateImageQualificationInStore, order_id } = this.props
    updateImageQualificationInStore(imageId, albumId, QUALIFIED)
    updateQualification({image_id: imageId, order_id, reaction: QUALIFIED}, ({res, err}) => {
      if(err) {
        updateImageQualificationInStore(imageId, albumId, UNQUALIFIED)
        console.log(err)
      }
    })
  }

  unqualifyImage(imageId, albumId) {
    const { updateImageQualificationInStore, order_id } = this.props
    updateImageQualificationInStore(imageId, albumId, UNQUALIFIED)
    updateQualification({image_id: imageId, order_id, reaction: UNQUALIFIED}, ({res, err}) => {
      if(err) {
        updateImageQualificationInStore(imageId, albumId, QUALIFIED)
        console.log(err)
      }
    })
  }

  render() {
    const { imageIdList } = this.props

    return (
      <FinalizeSelectionComponent
        handleChange={this.handleChange}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        getStyles={this.getStyles}
        getDefaultStyles={this.getDefaultStyles}
        value={this.state.value}
        updateFilter={this.updateFilter}
        qualifiedCount={this.state.qualifiedCount}
        totalCount={imageIdList.length}
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
  const { images, albums } = store
  let imageIdList = []

  for(let albumId in albums) {
    imageIdList = imageIdList.concat(albums[albumId].files)
  }

  return {
    order_id: store.order.id,
    imageIdList,
    images,
    albums
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
