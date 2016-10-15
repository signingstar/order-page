import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ProductTitle from "../components/product_title"
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
    const { images, order } = this.props

    processOrder(formData, () => this.setState({formSubmit: true}))
  }

  render() {
    const {pathname, product} = this.props

    const { value } = product
    if(this.state.formSubmit) {
      return <Redirect to={{
        pathname: `/order/confirm`,
        state: { from: this.props.location }
      }}/>
    }

    return (
      <div className='main-section-body'>
        <ProductTitle pathname={pathname} label={value} />
        <ProcessOrder pathname={pathname} onClick={this.handleClick} />
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    images: store.image.files,
    product: store.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps
)(ProcessOrderPage)
