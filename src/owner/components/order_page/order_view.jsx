import React from "react"
import Link from "react-router/Link"

import AlbumList from "../../containers/order_page/album_list"
import PreviewOrder from "../../containers/order_page/preview"

const ViewOrder = ({order, customer, albums}) => {
  const { cust_name, email, phone_number } = customer
  return (
    <div>
      <h1>#{order.id}: {order.name ? order.name : order.product.value}</h1>
      <PreviewOrder />
      <div className='inner-section customer row'>
        <h3> Customer Details <span></span></h3>
        <div className='customer-info'>
          <div>
            <span className='glyphicon glyphicon-user icon'></span><span className='value'>{cust_name}</span>
          </div>
          <div>
            <span className='glyphicon glyphicon-envelope icon'></span><span className='value'>{email}</span>
          </div>
          <div>
            <span className='glyphicon glyphicon-phone icon'></span><span className='value'>{phone_number}</span>
          </div>
        </div>
      </div>
      <div className='inner-section album-details row'>
        <h3> Album Details <span><Link to='/order/process'>Edit</Link></span></h3>
        <AlbumList />
      </div>
    </div>
  )
}

export default ViewOrder
