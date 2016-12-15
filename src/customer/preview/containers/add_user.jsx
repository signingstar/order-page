import React, {Component} from "react"
import {connect} from "react-redux"

import AddUser from "../components/add_user"

class AddUserHandler extends Component {
  constructor() {
    super()

    this.selectRole = this.selectRole.bind(this)

    this.state = {role: 3}
  }

  selectRole(e) {
    this.setState({role: e.value})
  }


  render() {
    const { image, pathname, params, role } = this.props

    const roleNodes = []

    const USER_ROLES = {
      5: {shortDescription: 'Admin', description: 'Admin - Full Access'},
      3: {shortDescription: 'Contributor', description: 'Contributor - Limited Access'},
      1: {shortDescription: 'Visitor', description: 'Visitor - View Access'}
    }

    for(let i in USER_ROLES) {
      roleNodes.push({value: +i, label: USER_ROLES[i].description})
    }

    return (
      role === 5 ?
      <div>
        <AddUser
          image={image}
          pathname={pathname}
          roleNodes={roleNodes}
          onSelect={this.selectRole}
          role={this.state.role}
        />
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserHandler)
