import React, {Component} from "react"
import { connect } from "react-redux"
// import DOMPurify from "dompurify"

import ProductTitle from "../components/product_title"
import CustomerDetails from "../components/customer_details"

import { setProduct, updateCustomerDetails, updateCustomerFormStatus } from "../actions"

class CustomerDetailsPage extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount() {
    const { onload, product: {key, value} } = this.props
    onload(key, value)
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

  render() {
    const { pathname, product: {key, value}, customer, message } = this.props
    const optionNodes = [{value: 'Wedding', label: 'Wedding'}, {value: 'travel', label: 'Travel'}]
    return (
      <div>
        <ProductTitle pathname={pathname} label={value} />
        <CustomerDetails
          pathname={pathname}
          onChange={this.handleChange}
          data={customer}
          message={message}
          onSelect={this.handleSelect}
          optionNodes={optionNodes}

        />
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    customer: store.customer,
    message: store.error.message || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onload: (key, value) => {
      dispatch(setProduct(key, value))
    },
    setCustomerDetails: (key, value) => {
      dispatch(updateCustomerDetails(key, value))
      dispatch(updateCustomerFormStatus(true))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailsPage)
