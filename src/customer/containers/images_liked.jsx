import React, {Component} from "react"
import {connect} from "react-redux"

import ImagesByReaction from "../components/images_by_reaction"
import { ALL, LIKES, LIKED } from "../actions"

class GroupLikedImages extends Component {
  constructor() {
    super()

    this.filterImages = this.filterImages.bind(this)
    this.state = {
      images: []
    }
  }

  componentWillMount() {
    this.setState({images: this.filterImages(this.props.filter)})
  }

  filterImages(filter) {
    const { imageSet, files } = this.props

    if(filter === ALL) {
      return files.map(file =>  Object.assign({}, imageSet[file], {id: file}))
    }

    return files.filter(file => imageSet[file][LIKES] === filter).map(file => Object.assign({}, imageSet[file], {id: file}))
  }

  filterImagesByPerson(filter, user) {
    if(!user) return this.filterImages(filter)

    const { imageSet, files } = this.props

    if(filter === ALL) {
      return files.map(file =>  Object.assign({}, imageSet[file], {id: file}))
    }

    return files.filter(file => (
      imageSet[file][LIKED] &&
      imageSet[file][LIKED].reaction_type === filter &&
      imageSet[file][LIKED].name === user
    )).map(file => Object.assign({}, imageSet[file], {id: file}))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({images: this.filterImages(nextProps.filter)})
  }

  render() {
    const { previewMode } = this.props

    return (
      <ImagesByReaction images={this.state.images} pathname={this.props.pathname} previewMode={previewMode}/>
    )
  }
}

const mapStateToProps = (store) => {
  const { images, albums } = store
  let files = []

  for(let album in albums) {
    files = files.concat(albums[album].files)
  }

  return {
    imageSet: images,
    files
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupLikedImages)
