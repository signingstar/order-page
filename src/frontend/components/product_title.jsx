import React from "react"
import Link from "react-router/Link"

const ChangeProduct = ({pathname, label}) => (
  <div>
    <h2 className='product-title'>Selected Product: {label}</h2>
    <Link to={{
      pathname: `${pathname}/products`,
      state: {type: 'select'}
    }}>Change
    </Link>

  </div>
)

export default ChangeProduct
