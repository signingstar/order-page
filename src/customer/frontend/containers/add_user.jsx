import React, {Component} from "react"
import {connect} from "react-redux"

import AddUser from "../components/add_user"
import UserList from "./user_list"
import { addUser, addUserToStore, USER_ROLES } from "../actions"

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
    const { onAdd, order_id } = this.props
    const role = this.state.role || 3

    e.preventDefault()

    let emailid = input.value
    if (!emailid.trim()) {
      return
    }

    emailid = emailid.trim()

    addUser({emailid, role, order_id}, ()=> onAdd(emailid, role))
    input.value = ''
  }

  render() {
    const { image, pathname, params, role } = this.props

    const roleNodes = []

    for(let i in USER_ROLES) {
      roleNodes.push({value: +i, label: USER_ROLES[i].description})
    }

    return (
      role === 5 ?
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
      : null
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  const { images } = store
  const { index, id } = ownProps
  const image = Object.assign({}, images[index], {index})

  return {
    image,
    order_id: store.order.id,
    role: store.order.role
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (email, role) => {
      dispatch(addUserToStore(email, role))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserHandler)
