import React from "react"
import Link from "react-router/Link"

const ChangeProduct = ({pathname, label, edit, orderId}) => {
  const orderLink = orderId ? <Link to={{pathname:`/orders/${orderId}`, state: {fromHeader: true}}}>#{orderId}</Link> : ''

  return (
    <div>
      <h2 className='product-title'>
        {label} <span style={{visibility: orderId ? 'visible' : 'hidden'}}>({orderLink})</span>
      </h2>
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
}

export default ChangeProduct
