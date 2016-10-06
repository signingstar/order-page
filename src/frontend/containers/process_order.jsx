import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ProcessOrder from "../components/process_order"
import { processOrder } from "../actions"

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
    processOrder({order_id: order.id}, () => this.setState({formSubmit: true}))
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
    order: store.order
  }
}

export default connect(
  mapStateToProps
)(ProcessOrderPage)
