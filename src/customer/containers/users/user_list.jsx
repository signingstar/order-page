import React, {Component} from "react"
import { connect } from "react-redux"

import User from "../../components/users/user"
import { deleteUser, deleteUserFromStore } from "../../actions"

class UsersDecorator extends Component {
  constructor() {
    super()

    this.onDeleteUser = this.onDeleteUser.bind(this)
  }

  onDeleteUser(emailid) {
    const { onDelete, order_id } = this.props

    deleteUser({emailid, order_id}, ()=> onDelete(emailid))
  }

  render() {
    const { user_list } = this.props

    const users = user_list.map(user => (
      <User
        key={user.email}
        onDelete={() => this.onDeleteUser(user.email)}
        {...user} />
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
    user_list: store.users || [],
    order_id: store.order.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (email) => {
      dispatch(deleteUserFromStore(email))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersDecorator)
