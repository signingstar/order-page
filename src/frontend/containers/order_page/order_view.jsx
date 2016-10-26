import React, {Component} from "react"
import {connect} from "react-redux"

import OrderView from "../../components/order_page/order_view"
import { populateImageList } from "../../actions"
import { imageMapToList } from "../../utils"

class PrepareOrderPage extends Component {
  componentWillMount() {
    let { albums, setImageList } = this.props

    setImageList(imageMapToList(albums))
  }

  render() {
    const { order, customer } = this.props

    return (
      <OrderView order={order} customer={customer}/>
    )
  }
}

const mapStateToProps = (store) => {
  const { order, albums } = store

  return {
    order,
    customer: order.customer,
    albums
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
)(PrepareOrderPage)
