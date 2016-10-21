import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from 'react-router/Redirect'

import CustomerDetails from "./customer_details"
import { setProduct } from "../actions"

class InitiateOrder extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const { onload, product, store_product } = this.props

    if(product && (!store_product || product.key !== store_product.key)) {
      const {key, value} = product
      onload(key, value)
    }
  }

  render() {
    const { product, pathname, location } = this.props

    return (
      <div className='main-section-body customer'>
        { product ?
          <CustomerDetails
            pathname={pathname}
            location={location}
          />
          : <Redirect to={{
            pathname: '/order/products',
            state: { from: this.props.location }
          }}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { order: {product} } = store
  const { location: {state} } = ownProps
  const stateType = state && state.type && state.type.key ? state.type : undefined

  return {
    product:  stateType || product,
    store_product: product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onload: (key, value) => {
      dispatch(setProduct(key, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateOrder)
