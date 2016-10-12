import React, {Component} from "react"
import {connect} from "react-redux"

import AddUser from "../components/add_user"
import UserList from "./user_list"
import { addUser, addUserToStore } from "../actions"

class AddUserHandler extends Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)
    this.selectRole = this.selectRole.bind(this)

    this.state = {role: 3}
  }

  selectRole(e) {
    this.setState({role: e.value})
  }

  onSubmit(e, input) {
    const { addUserToStore, order_id } = this.props
    const role = this.state.role || 3

    e.preventDefault()

    let emailid = input.value
    if (!emailid.trim()) {
      return
    }

    emailid = emailid.trim()

    addUser({emailid, role, order_id}, ()=> addUserToStore(emailid, role))
    input.value = ''
  }

  render() {
    const { image, pathname, params } = this.props

    const roleNodes = [
      {value: 5, label: 'Admin - Full Access'},
      {value: 3, label: 'Contributor - Limited Access'},
      {value: 1, label: 'Visitor - View Access'}
    ];

    return (
      <div>
        <AddUser
          image={image}
          pathname={pathname}
          onSubmit={this.onSubmit}
          roleNodes={roleNodes}
          onSelect={this.selectRole}
          role={this.state.role}
        />
        <UserList />
      </div>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images } = store
  const { index, id } = ownProps
  const image = Object.assign({}, images[index], {index})

  return {
    image,
    order_id: store.order.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserToStore: (email, role) => {
      dispatch(addUserToStore(email, role))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserHandler)
