import React, {Component} from "react"
import { connect } from "react-redux"

class Home extends Component {
  render() {
    const { order, images } = this.props

    const imageNodes = images.map(image => <img className='thumbnail' key={image.id} src={`/${image.path}`} />)

    return (
      <div>
        <h1>Yahooooooo</h1>
        <div>Product name: {order.productLabel}</div>
        <div>Category: {order.category}</div>
        <div>Photographer: {order.photographer}</div>
        <div>Status: {order.orderstatus}</div>
        <div>{imageNodes}</div>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    images: store.images
  }
}

export default connect(
  mapStateToProps
)(Home)
