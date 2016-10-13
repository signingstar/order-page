import React from "react"
import Link from "react-router/Link"
import Match from "react-router/Match"

import ImageTiles from "../containers/image_arrangement"
import AddUser from "../containers/add_user"

const MainPanel = ({ order, usersHash }) => {
  const { role, id } = order

  return (
    <div className='main-panel'>
      <div className='left-panel'>
        { role === 5 ? <Link to={`/order/${usersHash}/${id}/addUser`}>Add User</Link> : null }
      </div>
      <div className='right-panel'>
        <Match exactly pattern='/order/:usersHash/:orderId' component={ImageTiles} />
        <Match exactly pattern='/order/:usersHash/:orderId/addUser' component={AddUser} />
      </div>
    </div>
  )
}

export default MainPanel
