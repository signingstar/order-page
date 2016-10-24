import React, {Component} from "react"
import { connect } from "react-redux"
import Redirect from "react-router/Redirect"

import ProductTitle from "../components/product_title"
import ProcessOrder from "../components/process_order"
import { processOrder, addAlbum, addAlbumToImage } from "../actions"

class ProcessOrderPage extends Component {
  constructor() {
    super()

    this.state = {
      formSubmit: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.onAddAlbum = this.onAddAlbum.bind(this)
  }

  handleClick() {
    const { order, albums } = this.props
    const orderdata = {order_id: order.id}

    Object.keys(albums).forEach(albumId => orderdata[albumId] = albums[albumId].name)
    processOrder(orderdata, () => this.setState({formSubmit: true}))
  }

  onAddAlbum() {
    const { addAlbumToStore, order } = this.props

    addAlbum({order_id: order.id}, ({res}) => {
      const { id, name, priority} = res
      addAlbumToStore(id, name, priority)
    })
  }

  render() {
    const {pathname, product, albums, location} = this.props
    const { value } = product

    return (
      this.state.formSubmit ?
        <Redirect
          to={{
            pathname: `/order/confirm`,
            state: { from: location }
          }}
          push={true}
        />
      :
        <div className='main-section-body'>
          <ProductTitle pathname={pathname} label={value} />
          <ProcessOrder
            pathname={pathname}
            onClick={this.handleClick}
            albums={albums}
            addAlbum={this.onAddAlbum}
          />
        </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { order, albums } = store

  return {
    order,
    albums,
    product: order.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlbumToStore: (id, name, priority) =>  {
      dispatch(addAlbumToImage(id, name, priority))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessOrderPage)
