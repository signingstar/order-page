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
          // <li
          //   className='image-list-item'
          //   key={image.name} >
          //   <div className='image-name'>{image.name}</div>
          //   <div className='image-action' onClick={(e) => onRemove(e, image)}>x</div>
          // </li>
          )
        )}
      </ul>
    :
      <div className='placeholder'>{placeholder}</div>
  )
}

export default ImageFiles
