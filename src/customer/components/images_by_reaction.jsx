import React from "react"
import { TransitionMotion } from "react-motion"
import Link from "react-router/Link"

import { THUMBNAIL_VIEW, LIST_VIEW } from "../actions"

const ImagesByReaction = ({images, pathname, filter, previewMode}) => {
  return (
    previewMode === THUMBNAIL_VIEW ?

      <div className='image-list thumbnail'>
        {
          images.map(({id, originalname, srcSet: {thumbnail}}) => (
            <figure key={id} className="multi-row">
              <div className="item-tile">
                <div className="item-image">
                  <img src={`/${thumbnail}`} />
                </div>
                <figcaption>
                  <div className="item-label">
                    {originalname}
                  </div>
                </figcaption>
              </div>
            </figure>
          ))
        }
      </div>
      :
        <ul className='image-list thumbnail'>
          {
            images.map(({id, originalname, srcSet: {thumbnail}}) => (
              <li key={id}>{originalname}</li>
            ))
          }
        </ul>
  )
}

export default ImagesByReaction
