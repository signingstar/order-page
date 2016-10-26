import React, {Component} from "react"
import { connect } from "react-redux"
import { spring, presets } from "react-motion"

import AlbumDetails from "../../components/order_page/album"

class AlbumItem extends Component {
  constructor() {
    super()

    this.state = {
      expanded: false
    }

    this.handleExpand = this.handleExpand.bind(this)
    this.getDefaultStyles = this.getDefaultStyles.bind(this)
    this.getStyles = this.getStyles.bind(this)
  }

  handleExpand() {
    this.setState({expanded: !this.state.expanded})
  }

  // actual animation-related logic
  getDefaultStyles() {
    const { files } = this.props
    return files.map(file => ({data: file, key: file.name, style: {height: 0, opacity: 1}}))
  }

  getStyles() {
    const { files } = this.props

    return files.map((file, i) => {
      return {
        data: file,
        key: file.name.toString(),
        style: {
          height: spring(30, presets.gentle),
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
    const { album } = this.props
    return (
      <AlbumDetails
        album={album}
        expanded={this.state.expanded}
        handleExpand={this.handleExpand}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        getStyles={this.getStyles}
        getDefaultStyles={this.getDefaultStyles}
      />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const albumId = ownProps.album.id
  const files = store.albums[albumId].files

  return {
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
)(AlbumItem)
