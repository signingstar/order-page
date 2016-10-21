import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ConfirmOrder from "../../components/confirm/confirm_order"
import { confirmOrder, populateImageList, setOrderName } from "../../actions"

const getPreciseSize = (size) => {
  const unitFactor = 1024 * 1024 * 1024
  return size ? (size > unitFactor ? (size/unitFactor).toFixed(2) + ' GB' : (size/(1024*1024)).toFixed(2) + ' MB') : 0
}

class ConfirmOrderPage extends Component {
  constructor() {
    super()

    this.state = {
      formSubmit: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    let { image, imageList, setImageList } = this.props
    if(imageList.length > 0 || Object.keys(image).length === 0) {
      return
    }

    const keys = Object.keys(image).sort((id1, id2) => image[id1].priority - image[id2].priority )
    imageList = keys.map(albumId => {
      const { id, name, priority, files = [] } = image[albumId]
      const size = files.length > 1 ? files.reduce((prev, curr) => prev.size + curr.size) : (files.length > 0 ? files[0].size : 0)
      return {id: albumId, priority, name, count: files.length, size: getPreciseSize(size) }
    })

    setImageList(imageList)
  }

  handleClick() {
    const { order } = this.props
    confirmOrder({order_id: order.id, order_name: order.name}, () => this.setState({formSubmit: true}))
  }

  handleChange(e) {
    const { setShortName } = this.props
    setShortName(e.target.value)
  }

  render() {
    const {pathname, order} = this.props

    return (
      this.state.formSubmit ?
        <Redirect
          to={{
            pathname: `/order/submit`,
            state: { from: this.props.location }
          }}
          push={true}
        />
      :
        <ConfirmOrder
          pathname={pathname}
          onClick={this.handleClick}
          orderName={order.name || `Order-${order.id}`}
          handleChange={this.handleChange}
          autoFocus={true}
        />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    image: store.image,
    imageList: store.imageList || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImageList: (list) => {
      dispatch(populateImageList(list))
    },

    setShortName: (name) => {
      dispatch(setOrderName(name))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmOrderPage)
