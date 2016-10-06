import React, {Component} from "react"
import { connect } from "react-redux"

class Home extends Component {
  render() {
    const { order } = this.props

    return (
      <div>
        <h1>Yahooooooo</h1>
        <div>Product name: {order.product}</div>
        <div>Category: {order.category}</div>
        <div>Photographer: {order.photographer}</div>
        <div>Status: {order.orderstatus}</div>
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
