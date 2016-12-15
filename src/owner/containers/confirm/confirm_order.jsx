import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ConfirmOrder from "../../components/confirm/confirm_order"
import { confirmOrder, populateImageList, setOrderParam } from "../../actions"
import { imageMapToList } from "../../utils"

class ConfirmOrderPage extends Component {
  constructor() {
    super()

    this.state = {
      formSubmit: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount() {
    let { albums, setImageList } = this.props

    setImageList(imageMapToList(albums))
  }

  handleClick() {
    const { order: {id, name, category} } = this.props

    confirmOrder(
      {
        order_id: id,
        order_name: name,
        category
      },
      () => this.setState({formSubmit: true})
    )
  }

  handleChange(e) {
    this.props.updateOrderParam({name: e.target.value})
  }

  handleSelect(e) {
    const { order, updateOrderParam } = this.props
    const selected = e.value

    if(order.category !== selected) {
      updateOrderParam({category: selected})
    }
  }

  render() {
    const {pathname, categories, order} = this.props

    const optionNodes = categories.map(({id, description}) => {
      return {value: id, label: description}
    })

    return (
      this.state.formSubmit ?
        <Redirect
          to={{
            pathname: `/order/submit`,
            state: { from: this.props.location }
          }}
          push={true}
        />
      :
        <ConfirmOrder
          pathname={pathname}
          onClick={this.handleClick}
          orderName={order.name || `Order-${order.id}`}
          handleChange={this.handleChange}
          onSelect={this.handleSelect}
          optionNodes={optionNodes}
          category={order.category}
        />
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { order, categories, albums, imageList = []} = store

  return {
    order,
    categories,
    albums,
    imageList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImageList: (list) => {
      dispatch(populateImageList(list))
    },

    updateOrderParam: (param) => {
      dispatch(setOrderParam(param))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmOrderPage)
