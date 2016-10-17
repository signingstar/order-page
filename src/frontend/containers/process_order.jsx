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
    const { order, image } = this.props
    const orderdata = {order_id: order.id}
    Object.keys(image).forEach(albumId => orderdata[albumId] = image[albumId].name)

    processOrder(orderdata, () => this.setState({formSubmit: true}))
  }

  onAddAlbum() {
    const { addAlbumToStore, order } = this.props
    addAlbum({
      order_id: order.id
    }, ({res}) => addAlbumToStore(res.album_id, res.album_name, res.priority))
  }

  render() {
    const {pathname, product, image} = this.props

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
        <ProcessOrder
          pathname={pathname}
          onClick={this.handleClick}
          image={image}
          addAlbum={this.onAddAlbum}
        />
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    image: store.image,
    product: store.product
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
