import React from "react"

const HeaderPanel = ({order}) => (
  <div className='top-panel'>
    <h1>{order.productLabel}</h1>
    <div className='credit'>By {order.photographer}</div>
    <div className='status'>({order.orderstatus})</div>
  </div>
)

export default HeaderPanel
