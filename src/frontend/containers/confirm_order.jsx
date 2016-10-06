import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ConfirmOrder from "../components/confirm_order"
import { confirmOrder } from "../actions"

class ProcessOrderPage extends Component {
  constructor() {
    super()

    this.state = {
      formSubmit: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { order } = this.props
    confirmOrder({order_id: order.id}, () => this.setState({formSubmit: true}))
  }

  render() {
    const {pathname} = this.props
    if(this.state.formSubmit) {
      return <Redirect to={{
        pathname: `/order/submit`,
        state: { from: this.props.location }
      }}/>
    }

    return (
      <ConfirmOrder pathname={pathname} onClick={this.handleClick} />
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
)(ProcessOrderPage)
