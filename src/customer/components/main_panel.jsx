import React from "react"
import {
  Route,
} from 'react-router-dom'

import ImageTiles from "../containers/image_arrangement"
import AddUser from "../containers/users"
import AlbumList from "../containers/album_list"
import FinalizeSelection from "../containers/finalize_selection"
import ImagesLiked from "../containers/images_liked"

const MainPanel = ({ order, usersHash, query }) => {
  const { role, id } = order

  return (
    <div className='main-panel'>
      <div className='left-panel'>
        <AlbumList usersHash={usersHash} id={id} />
        <ul className='all-images'>
          <li className='nav-left'>
            <Link
              to={`/order/${usersHash}/${id}`}
              activeClassName='active'
              activeOnlyWhenExact
              isActive={(location) => (
                (!location.query || !location.query.album) && location.pathname.Route(/^\/order\/[a-z0-9]+\/[0-9]+$/)
              )}
            >
              <span className='glyphicon glyphicon-picture icon'></span>
              All Photos
            </Link>
          </li>
        </ul>
        {
          role === 5 ?
            <ul className='admin-panel'>
              <li className='nav-left'>
                <Link
                  to={`/order/${usersHash}/${id}/adduser`}
                  activeClassName='active'
                >
                  <span className='glyphicon glyphicon-user icon'></span>
                  Add Users
                </Link>
              </li>
              <li className='nav-left'>
                <Link
                  to={`/order/${usersHash}/${id}/liked`}
                  activeClassName='active'
                >
                  <span className='glyphicon glyphicon-thumbs-up icon'></span>
                  Images Liked
                </Link>
              </li>
              <li className='nav-left submit'>
                <Link
                  to={`/order/${usersHash}/${id}/finalize`}
                  activeClassName='active'
                >
                  <span className='glyphicon glyphicon-ok icon'></span>
                  Finalize & Submit
                </Link>
              </li>
            </ul>
          : null
        }
      </div>
      <div className='right-panel'>
        <Route exact path='/order/:usersHash/:orderId' component={ImageTiles} />
        <Route exact path='/order/:usersHash/:orderId/adduser' component={AddUser} />
        <Route exact path='/order/:usersHash/:orderId/finalize' component={FinalizeSelection} />
        <Route exact path='/order/:usersHash/:orderId/liked' component={ImagesLiked} />
      </div>
    </div>
  )
}

export default MainPanel
