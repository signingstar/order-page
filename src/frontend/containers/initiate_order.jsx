import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from 'react-router/Redirect'

import CustomerDetails from "./customer_details"

class InitiateOrder extends Component {
  componentWillMount() {
    const { onload } = this.props
  }

  render() {
    const { product, pathname } = this.props

    return (
      <div className='main-section-body'>
        { product ?
          <CustomerDetails pathname={pathname} product={product} />
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
  const { product } = store
  const { location: {state} } = ownProps
  const stateType = state && state.type && state.type.key ? state.type : undefined
  const productType = product && product.key ? product : undefined

  return {
    product: stateType || productType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitiateOrder)
