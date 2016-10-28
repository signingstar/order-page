import React from "react"
import Link from "react-router/Link"
import Match from "react-router/Match"

import ImageTiles from "../containers/image_arrangement"
import AddUser from "../containers/add_user"
import AlbumList from "../containers/album_list"
import FinalizeSelection from "../containers/finalize_selection"

const MainPanel = ({ order, usersHash, query }) => {
  const { role, id } = order

  return (
    <div className='main-panel'>
      <div className='left-panel'>
        <AlbumList usersHash={usersHash} id={id} />
        <ul>
          <li className='nav-left'>
            <Link
              to={`/order/${usersHash}/${id}`}
              activeClassName='active'
              activeOnlyWhenExact
              isActive={(location) => (
                (!location.query || !location.query.album) && location.pathname.match(/^\/order\/[a-z0-9]+\/[0-9]+$/)
              )}
            >
              <span className='glyphicon glyphicon-picture icon' style={{color: '#800080'}}></span>
              All Photos
            </Link>
          </li>
        </ul>
        {
          role === 5 ?
            <ul className='admin-panel'>
              <li className='nav-left'>
                <Link
                  to={`/order/${usersHash}/${id}/addUser`}
                  activeClassName='active'
                >
                  <span className='glyphicon glyphicon-wrench icon' style={{color: '#006400'}}></span>
                  Add Users
                </Link>
              </li>
              <li className='nav-left'>
                <Link
                  to={`/order/${usersHash}/${id}/finalize`}
                  activeClassName='active'
                >
                  <span className='glyphicon glyphicon-ok icon' style={{color: '#8B4513'}}></span>
                  Finalize Selection
                </Link>
              </li>
            </ul>
          : null
        }
      </div>
      <div className='right-panel'>
        <Match exactly pattern='/order/:usersHash/:orderId' component={ImageTiles} />
        <Match exactly pattern='/order/:usersHash/:orderId/addUser' component={AddUser} />
        <Match exactly pattern='/order/:usersHash/:orderId/finalize' component={FinalizeSelection} />
      </div>
    </div>
  )
}

export default MainPanel
