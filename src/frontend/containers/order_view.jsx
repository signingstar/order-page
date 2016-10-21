import React, {Component} from "react"
import {connect} from "react-redux"

import OrderView from "../components/order_view"

class PrepareOrderPage extends Component {
  render() {
    const { order } = this.props

    return (
      <OrderView order={order}/>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    order: store.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrepareOrderPage)
