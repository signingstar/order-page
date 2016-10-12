import React, {Component} from "react"
import { connect } from "react-redux"
import Link from "react-router/Link"
import Match from "react-router/Match"

import ImageTiles from "./image_arrangement"
import AddUser from "./add_user"

class Home extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { users } = this.props
  }

  render() {
    const { order, images, pathname, pattern, params } = this.props
    const { usersHash, orderId } = params
    const homePage = pattern !== '/order/:usersHash/:orderId/:fileName'

    if(!homePage) return null

    return (
      <div className='panels'>
        <div className='left-panel'>
          <div>{order.productLabel}</div>
          <div>Photographer: {order.photographer}</div>
          <div>Status: {order.orderstatus}</div>
          <Link to={`/order/${usersHash}/${orderId}/addUser`}>Add User</Link>
        </div>
        <div className='right-panel'>
          <Match exactly pattern='/order/:usersHash/:orderId' component={ImageTiles} />
          <Match exactly pattern='/order/:usersHash/:orderId/addUser' component={AddUser} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order,
    users: store.users
  }
}

export default connect(
  mapStateToProps
)(Home)
