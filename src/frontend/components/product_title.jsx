import React from "react"
import Link from "react-router/Link"

const ChangeProduct = ({pathname, label, edit}) => (
  <div>
    <h2 className='product-title'>{label}</h2>
    { edit ?
      <Link to={{
        pathname: `${pathname}/products`,
        state: {type: 'select'}
      }}>Change
      </Link>
      : null
    }


  </div>
)

export default ChangeProduct
