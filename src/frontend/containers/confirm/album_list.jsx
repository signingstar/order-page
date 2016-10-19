import React, {Component} from "react"
import { connect } from "react-redux"

import AlbumList from "../../components/confirm/album_list"
import { populateImageList } from "../../actions"

const reinsert = (albumList, from, to) => {
  const albumListNew = albumList.slice(0)
  const srcAlbum = albumListNew[from]
  const tempPriority = srcAlbum.priority

  srcAlbum.priority = albumListNew[to].priority
  albumListNew[to].priority = tempPriority
  albumListNew.splice(from, 1)
  albumListNew.splice(to, 0, srcAlbum)

  return albumListNew
}

// To check if list item is in range
const clamp = (n, min, max) =>  Math.max(Math.min(n, max), min)

class AlbumListConfiguration extends Component {
  constructor() {
    super()

    this.itemHeight = 50
    this.itemSpacing = 10

    this.state = {
      delta: 0, // Used to calculate height wrt to current contaier (postion of list item - position of list container)
      mouse: 0, // Stores height wrt container
      isPressed: false,
      lastPressed: 0,
      lastPressedIndex: 0,
      prior: 174
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDown(pos, pressY, e) {
    const { button, pageY } = e
    const { imageList } = this.props
    if(e.button === 0) {
      this.setState({
        delta: pageY,
        mouse: pressY,
        isPressed: true,
        lastPressed: pos,
        lastPressedIndex: imageList.indexOf(pos)
      })
    }
  }

  handleMouseMove({pageY}) {
    const { imageList, setImageList } = this.props
    const {isPressed, delta, lastPressed, lastPressedIndex} = this.state

    if (isPressed) {
      const mouse = pageY - delta
      const effectiveMouse = mouse + lastPressedIndex * this.itemHeight
      const row = clamp(Math.round(effectiveMouse / (this.itemHeight + this.itemSpacing)), 0, imageList.length - 1)
      const indexLastPressed = imageList.indexOf(lastPressed)

      if(row !== indexLastPressed) {
        const newImageList = reinsert(imageList, indexLastPressed, row)
        setImageList(newImageList)
      }

      this.setState({mouse})
    }
  }

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0})
  }

  render() {
    const {mouse, isPressed, lastPressed, lastPressedIndex} = this.state
    const {imageList} = this.props

    return (
      <AlbumList
        albumList={imageList}
        mouse={mouse}
        isPressed={isPressed}
        lastPressed={lastPressed}
        handleMouseDown={this.handleMouseDown}
        lastPressedIndex={lastPressedIndex}
        itemHeight={this.itemHeight}
        itemSpacing={this.itemSpacing}
      />
    )
  }
}

const mapStateToProps = (store) => {
  return {
    imageList: store.imageList || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImageList: (list) => {
      dispatch(populateImageList(list))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumListConfiguration)
