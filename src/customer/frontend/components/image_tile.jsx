import React from "react"
import Link from "react-router/Link"

import ImageFeedback from "../containers/image_feedback"

const ImageTile = ({pathname, image}) => {
  const { id, filename, destination, index, originalname} = image

  return (
    <figure className="multi-row">
      <div className="item-tile">
        <div className="item-image">
          <Link to={{
            pathname: `${pathname}/${id}`,
            state: { originalUrl: pathname, index: index }
          }}
          >
            <img id={id} src={`/${destination}/${filename}`} title={originalname} alt='' />
          </Link>
        </div>
        <figcaption>
          <div className="item-label">
            {originalname}
          </div>
          <ImageFeedback image={image} modal={false} />
        </figcaption>
      </div>
    </figure>
  )
}

export default ImageTile
