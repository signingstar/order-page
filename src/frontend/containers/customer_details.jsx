import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from 'react-router/Redirect'
// import DOMPurify from "dompurify"

import ProductTitle from "../components/product_title"
import CustomerDetails from "../components/customer_details"

import { updateCustomerDetails, updateCustomerFormStatus } from "../actions"
import { updateOrder, createOrder, clearAllErrors, setError, setSuccess } from "../actions"

class CustomerDetailsPage extends Component {
  constructor() {
    super()

    this.state = {navigate: false}

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addOrder = this.addOrder.bind(this)
  }

  handleChange(e) {
    const { setCustomerDetails, customer } = this.props
    const {name, value} = e.target

    if(customer[name] !== value) {
      setCustomerDetails(name, value)
    }
  }

  handleSelect(e) {
    const { customer, setCustomerDetails } = this.props
    const selected = e.value

    if(customer.category !== selected) {
        setCustomerDetails('category', selected)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { customer, orderid, product, updateOrderToStore, clearErrors } = this.props
    const orderData = this.prepareOrderData(customer, product)

    if(orderid && customer.dirty) {
      updateOrderToStore()
      this.setState({navigate: true})
    } else if(!orderid) {
      clearErrors()
      createOrder(orderData, this.addOrder)
    } else {
      this.setState({navigate: true})
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
      setErrorInStore(err)
    } else {

      if(res) {
        addOrderToStore(res)
        this.setState({navigate: true})
      }
    }
  }

  render() {
    const { pathname, customer, message, categories, product, location } = this.props
    const optionNodes = categories.map(category => {
      return {value: category.name, label: category.description}
    })

    const {value} = product

    return (
      this.state.navigate ?
        <Redirect
          to={{
            pathname: `/order/process`,
            state: { from: location }
          }}
          push={true}
        />
      :
        <div>
          <ProductTitle pathname={pathname} label={value} edit={true} />
          <CustomerDetails
            pathname={pathname}
            onChange={this.handleChange}
            data={customer}
            message={message}
            onSelect={this.handleSelect}
            optionNodes={optionNodes}
            onSubmit={this.handleSubmit}
          />
        </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    customer: store.customer,
    message: store.error.message || {},
    categories: store.categories || [],
    orderid: store.order.id,
    product: store.product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCustomerDetails: (key, value) => {
      dispatch(updateCustomerDetails(key, value))
      dispatch(updateCustomerFormStatus(true))
    },
    addOrderToStore: (res) => {
      dispatch(updateOrder(
        {
          orderData: {id: res.order_id},
          albumData: {id: res.id, name: res.name, priority: res.priority},
          dirty: false
        }
      ))
      // dispatch(updateCustomerFormStatus(false))
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
)(CustomerDetailsPage)
