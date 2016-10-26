import React from "react"

import AlbumDetail from "../../containers/order_page/album"

const AlbumList = ({albumList, itemHeight, itemSpacing}) => {
  const albumLength = albumList.length

  return (
    <div className='album-container'>
      <ul className='album-list-view'>
        {
          albumList.map((entry, index) => {
            return (
              <AlbumDetail album={entry} key={entry.name} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default AlbumList
