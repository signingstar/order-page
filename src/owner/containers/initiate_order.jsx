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
    const { setProductFromLink, location: {state} } = this.props

    if(state && state.type && state.type.key) {
      const {key, value} = state.type
      setProductFromLink(key, value)
    }
  }

  render() {
    const { product, pathname, location } = this.props
    const { state } = location
    const stateProduct = state && state.type && state.type.key ? state.type : undefined

    return (
      <div className='main-section-body customer'>
        { product || stateProduct ?
          <CustomerDetails
            pathname={pathname}
            location={location}
          />
          : <Redirect to={{
            pathname: '/order/products',
            state: { from: location }
          }}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { order: {product} } = store

  return {
    product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProductFromLink: (key, value) => {
      dispatch(setProduct(key, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateOrder)
