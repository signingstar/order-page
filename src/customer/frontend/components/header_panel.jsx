import React from "react"

const HeaderPanel = ({order}) => (
  <div className='top-panel'>
    <h1>{order.productLabel}</h1>
    <div>Photographer: {order.photographer}</div>
    <div>Status: {order.orderstatus}</div>
  </div>
)

export default HeaderPanel
