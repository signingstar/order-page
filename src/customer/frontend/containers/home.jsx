import React, {Component} from "react"
import { connect } from "react-redux"

import ImageTiles from "./image_arrangement"

class Home extends Component {
  render() {
    const { order, images, pathname } = this.props

    return (
      <div>
        <h1>Yahooooooo</h1>
        <div>Product name: {order.productLabel}</div>
        <div>Category: {order.category}</div>
        <div>Photographer: {order.photographer}</div>
        <div>Status: {order.orderstatus}</div>
        <ImageTiles pathname={pathname}/>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order
  }
}

export default connect(
  mapStateToProps
)(Home)
