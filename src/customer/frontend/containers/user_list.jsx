import React, {Component} from "react"
import { connect } from "react-redux"

import User from "../components/user"

class UsersDecorator extends Component {
  render() {
    const { user_list } = this.props

    const users = user_list.map(user => (
      <User key={user.email} {...user} />
    ))

    return (
      <div>
        {users}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user_list: store.order.users || []
  }
}

export default connect(
  mapStateToProps
)(UsersDecorator)
