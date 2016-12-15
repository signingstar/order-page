import React from "react"

import ImageTile from "../containers/image_tile"

const ImageTiles = (props) => {
  const { images, pathname, albumId } = props

  const imageNodes = images.map((image, index) => <ImageTile index={index} key={image} id={image} pathname={pathname} albumId={albumId} />)

  return (
    <div className='thumbnail'>
      {imageNodes}
    </div>
  )
}

export default ImageTiles
