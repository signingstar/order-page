import React from "react"

import ImageTile from "../containers/image_tile"

const ImageTiles = (props) => {
  const { images, pathname } = props

  const imageNodes = images.map((image, index) => <ImageTile index={index} key={index} id={image.id} pathname={pathname} />)

  return (
    <div className='thumbnail'>
      {imageNodes}
    </div>
  )
}

export default ImageTiles
