import React, {Component} from "react"

import CanvasItem from "../containers/canvas"

const CANVAS_THRESHOLD = 1 * 1024 * 1024

const ImageFiles = ({images, onRemove, placeholder, mode}) => {
  return (
    images.length > 0 ?
      <div className='image-view'>
        {
          mode === 'list' ?
            <div className='list-header'>
              <div className='name'>File Name</div>
              <div className='size'>File Size</div>
              <div className='action'>Action</div>
            </div>
          : undefined
        }
        <ul className={ mode === 'thumbnail' ? 'image-list thumbnail' : 'image-list list'}>
          {images.map(image => (
            <li key={image.name} className='image-list-item'>
              {
                mode === 'thumbnail' ?
                  <CanvasItem image={image} onRemove={onRemove} />
                :
                <div className='list-view'>
                  <div className='image-name'>{image.name}</div>
                  <div className='image-size'>{image.size}</div>
                  <div className='image-action' onClick={(e) => onRemove(e, image)}>{String.fromCharCode(0x2013)}</div>
                </div>
              }
            </li>
            )
          )}
        </ul>
      </div>
    :
      <div className='placeholder'>{placeholder}</div>
  )
}

export default ImageFiles
