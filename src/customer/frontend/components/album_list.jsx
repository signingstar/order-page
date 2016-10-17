import React from "react"
import Link from "react-router/Link"

const AlbumList = ({ usersHash, id, albums }) => {
  const albumList = albums.map(album => (
    <li key={album.id} className='nav-left'>
      <Link
        to={{
          pathname: `/order/${usersHash}/${id}`,
          query: {album: album.id}
        }}
        activeClassName='active'
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
