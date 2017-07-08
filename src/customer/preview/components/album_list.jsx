import React from "react"
import Link from "react-router-dom/Link"

const AlbumList = ({ usersHash, id, albums, orderId }) => {
  const albumList = albums.map(album => (
    <li key={album.id} className='nav-left'>
      <Link
        to={{
          pathname: `/orders/${orderId}/preview`,
          query: {album: album.id}
        }}
        activeClassName='active disabled'
        activeOnlyWhenExact
      >
        {album.name}
      </Link>
    </li>
  ))

  return (
    <ul>
      {albumList}
    </ul>
  )
}

export default AlbumList
