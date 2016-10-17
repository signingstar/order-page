import React, {Component} from "react"
import { connect } from "react-redux"

import HeaderPanel from "../components/header_panel"
import MainPanel from "../components/main_panel"

class Home extends Component {
  constructor() {
    super()
  }

  render() {
    const { order, images, pathname, pattern, params, location } = this.props
    const { usersHash, orderId } = params
    const homePage = pattern !== '/order/:usersHash/:orderId/:fileName'
    const { role } = order
    const { query } = location

    if(!homePage) return null

    return (
      <div className='panels'>
        <HeaderPanel order={order}/>
        <MainPanel order={order} query={query} {...params} />
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    order: store.order
  }
}

export default connect(
  mapStateToProps
)(Home)
