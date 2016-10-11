import React, {Component} from "react"
import { connect } from "react-redux"

import ImageTiles from "./image_arrangement"

class Home extends Component {
  render() {
    const { order, images, pathname } = this.props

    return (
      <div className='panels'>
        <div className='left-panel'>
          <div>{order.productLabel}</div>
          <div>Photographer: {order.photographer}</div>
          <div>Status: {order.orderstatus}</div>
        </div>
        <div className='right-panel'>
          <ImageTiles pathname={pathname}/>
        </div>
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
