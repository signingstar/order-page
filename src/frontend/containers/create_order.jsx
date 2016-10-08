import React, {Component} from "react"
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import { connect } from "react-redux"

import { updateCustomerDetails, updateOrder, createOrder, updateCustomerFormStatus, clearAllErrors, setError, setSuccess } from "../actions"

class CreateOrder extends Component {
  constructor() {
    super()

    this.addOrder = this.addOrder.bind(this)
    this.state = {err: undefined, fetching: false}
  }
  componentWillMount() {
    const { customer, isDirty, orderid, product, updateOrderToStore, clearErrors } = this.props
    const orderData = this.prepareOrderData(customer, product)

    if(orderid && customer.dirty) {
      this.setState({fetching: true})
      updateOrderToStore()
      this.setState({fetching: false})
    } else if(!orderid) {
      this.setState({fetching: true})
      createOrder(orderData, this.addOrder)
      clearErrors()
    }
  }

  prepareOrderData(customer, product) {
    const { cust_name, email, phone_number, category, image_count} = customer
    const nameParts = cust_name ? cust_name.split(" ") : undefined
    let first_name = cust_name, last_name = ''

    if(nameParts && nameParts.length >= 2) {
      last_name = nameParts.pop()
      first_name = nameParts.join(' ')
    }

    return {
      first_name,
      last_name,
      email,
      phone_number,
      category,
      product: product.key,
      image_count
    }
  }

  addOrder({err, res}) {
    const { setErrorInStore, addOrderToStore } = this.props
    if(err) {
      this.setState({err, fetching: false})
      setErrorInStore(err)
    } else {

      if(res) {
        addOrderToStore(res)
      }
      this.setState({fetching: false})
    }

  }

  render() {
    const { component: Component, ...rest } = this.props
    return <Match {...rest} render={props => {
      return this.state.fetching ?
        <div className='busy-icon'><img src="/assets/spinning_clock.gif" /></div>
      : (this.state.err ?
        <Redirect to={{
          pathname: `/order`,
          state: { from: props.location }
        }}/>
      : <Redirect to={{
        pathname: `/order/process`,
        state: { from: props.location }
      }}/>
      )
    }}/>
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    customer: store.customer,
    orderid: store.order.id,
    product: store.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addOrderToStore: (res) => {
      dispatch(updateOrder('id', res.order_id))
      dispatch(updateCustomerFormStatus(false))
      dispatch(clearAllErrors())
    },

    updateOrderToStore: () => {
      dispatch(updateCustomerFormStatus(false))
    },

    setErrorInStore: (err) => {
      dispatch(setError(err))
    },

    clearErrors: () => dispatch(clearAllErrors())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateOrder)
