import React from "react"
import Link from "react-router/Link"

const ViewOrder = ({order}) => {
  return (
    <div>
      <h1>Order Name: {order.name}</h1>
      <Link to='/order'>Edit</Link>
    </div>
  )
}

export default ViewOrder
