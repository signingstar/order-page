import React, {Component} from "react"
import {connect} from "react-redux"

const WIDTH  = 112
const HEIGHT = 87

class CanvasItem extends Component {
  constructor() {
    super()

    this.state = {
      height: 0,
      width: 0
    }
  }

  componentDidMount() {
    const {image} = this.props
    if(image.preview) {
      const Reader = new FileReader()
      const context = this.canvasNode.getContext('2d')

      Reader.onload = this.loadCanvas.bind(this, context)
      Reader.readAsDataURL(image)
    }
  }

  loadCanvas(context, e) {
    const img = new Image()
    img.onload = () => {
      const imageHeight = img.height
      const imageWidth = img.width
      const landscape = imageWidth >= imageHeight * (WIDTH/HEIGHT)

      const width = landscape ? imageHeight * (WIDTH/HEIGHT) : imageWidth
      const height = landscape ? imageHeight : imageWidth * (HEIGHT/WIDTH)

      const widthOffset = (imageWidth - width) /2
      const heightOffset = (imageHeight - height) /2

      context.drawImage(img, widthOffset, heightOffset, width, height, 0, 0, WIDTH, HEIGHT)
    }

    img.src = e.target.result;
  }

  render() {
    const {image, onRemove} = this.props

    return (
      image.preview ?
        <div className='thumbnail-view'>
          <canvas
            ref={node => { this.canvasNode = node }}
            height={HEIGHT}
            width={WIDTH}
          ></canvas>
          <div className='image-name'>{image.name}</div>
          <div className='image-action' onClick={(e) => onRemove(e, image)}>{String.fromCharCode(0x2013)}</div>
        </div>
      :
        <div>
          <div className='image-name'>{image.name}</div>
          <div className='image-action' onClick={(e) => onRemove(e, image)}>{String.fromCharCode(0x2013)}</div>
        </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRemove: (e, name) => {
      ownProps.onRemove(e, name)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CanvasItem)
