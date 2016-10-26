import React from "react"
import Link from "react-router/Link"
import Match from "react-router/Match"

import ImageTiles from "../containers/image_arrangement"
import AddUser from "../containers/add_user"
import AlbumList from "../containers/album_list"

const MainPanel = ({ order, usersHash, query }) => {
  const { role, id } = order

  return (
    <div className='main-panel'>
      <div className='left-panel'>
        <AlbumList usersHash={usersHash} id={id} />
        <ul>
          <li className='nav-left'>
            <Link
              to={`/orders/${id}/preview`}
              activeClassName='active'
              activeOnlyWhenExact
              isActive={(location) => (
                (!location.query || !location.query.album) && location.pathname.match(/^\/orders\/[a-z0-9]+\/preview$/)
              )}
            >
              All Photos
            </Link>
          </li>
          {
            role === 5 ?
              <li className='nav-left'>
                <Link
                  to={`/orders/${id}/preview/addUser`}
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
        <Match exactly pattern='/orders/:orderId/preview' component={ImageTiles} />
        <Match exactly pattern='/orders/:orderId/preview/addUser' component={AddUser} />
      </div>
    </div>
  )
}

export default MainPanel
