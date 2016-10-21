import React, {Component} from "react"
import { connect } from "react-redux"

import AlbumList from "../../components/confirm/album_list"
import { populateImageList, swapAlbum, updateAlbum } from "../../actions"

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
      const effectiveMousePosition = mouse + lastPressedIndex * this.itemHeight
      const possibleRow = Math.round(effectiveMousePosition / (this.itemHeight + this.itemSpacing))
      const row = clamp(possibleRow, 0, imageList.length - 1)
      const indexLastPressed = imageList.indexOf(lastPressed)

      this.swapAlbumPriority(indexLastPressed, row)
      this.setState({mouse})
    }
  }

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0})
  }

  swapAlbumPriority(src, target) {
    if(src === target) return

    const { imageList, swapAlbumInStore, order_id } = this.props
    const srcAlbum = imageList[src]
    const destAlbum = imageList[target]

    const updateJson = {
      order_id,
      mapping: {
        [srcAlbum.id]: destAlbum.priority,
        [destAlbum.id]: srcAlbum.priority
      }
    }

    swapAlbumInStore(src, target)
    updateAlbum(updateJson, ({res}) => console.log(res.count))
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
    order_id: store.order.id,
    imageList: store.imageList || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImageList: (list) => {
      dispatch(populateImageList(list))
    },

    swapAlbumInStore: (source, destination) => {
      dispatch(swapAlbum(source, destination))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumListConfiguration)
