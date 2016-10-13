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
        <ul>
          <li className='nav-left'>
            <Link
              to={`/order/${usersHash}/${id}`}
              activeClassName='active'
              activeOnlyWhenExact
            >
              All Photos
            </Link>
          </li>
          {
            role === 5 ?
              <li className='nav-left'>
                <Link
                  to={`/order/${usersHash}/${id}/addUser`}
                  activeClassName='active'
                >
                  Add User
                </Link>
              </li>
            : null
          }
        </ul>
      </div>
      <div className='right-panel'>
        <Match exactly pattern='/order/:usersHash/:orderId' component={ImageTiles} />
        <Match exactly pattern='/order/:usersHash/:orderId/addUser' component={AddUser} />
      </div>
    </div>
  )
}

export default MainPanel
