import React, {Component} from "react"

import CanvasItem from "../containers/canvas"

const ImageFiles = ({images, onRemove, placeholder}) => {
  return (
    images.length > 0 ?
      <ul className='image-list'>
        {images.map(image => (
          <li key={image.name} className='image-list-item'>
            <CanvasItem image={image} onRemove={onRemove} />
          </li>
          // </li>
          )
        )}
      </ul>
    :
      <div className='placeholder'>{placeholder}</div>
  )
}

export default ImageFiles
