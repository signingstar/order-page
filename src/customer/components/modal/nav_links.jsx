import React from "react"
import Link from "react-router-dom/Link"

const NavLinks = ({ originalUrl, imageId, albumId, index, next }) => {
  const nextIndex = next ? index + 1 : index - 1
  const className = 'glyphicon icon ' + (next ? 'glyphicon-menu-right' : 'glyphicon-menu-left')

  return (
    <Link
      to={{
        pathname: `${originalUrl}/${imageId}`,
        state: { originalUrl, fromModal: true, index: nextIndex, albumId }
      }}
      className='image-nav-item'
    >
      <span className={className}></span>
    </Link>
  )
}

export default NavLinks
