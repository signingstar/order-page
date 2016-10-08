import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ProcessOrder from "../components/process_order"
import { processOrder, setImages } from "../actions"

class ProcessOrderPage extends Component {
  constructor() {
    super()

    this.state = {
      formSubmit: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { images, order } = this.props
    const formData = new FormData()

    formData.append('order_id', order && order.id ? order.id : 64)

    images.map(image => {
      formData.append('images', image)
    })

    processOrder(formData, () => this.setState({formSubmit: true}))
  }

  render() {
    const {pathname} = this.props
    if(this.state.formSubmit) {
      return <Redirect to={{
        pathname: `/order/confirm`,
        state: { from: this.props.location }
      }}/>
    }

    return (
      <ProcessOrder pathname={pathname} onClick={this.handleClick} />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    images: store.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps
)(ProcessOrderPage)
