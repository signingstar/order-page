import React from "react"
import Link from "react-router/Link"

import ProductItem from "./product_item"

const Products = ({pathname, items}) => {
  const linkNodes = items.map(item => (
    <div key={item.id}>
      <Link
        to={{
          pathname: '/order',
          state: {type: {key: item.id, value: item.description}}
        }}
        className='item-box'
      >
        <ProductItem
          label={item.description}
          imgSrc='/assets/round3.png'
          categoryClass='category'
        />
      </Link>
    </div>

  ))
  let retouching = items[0].description
  let printing = 'Album Printing'

  return (
    <div className='main-section-body products'>
      {linkNodes}
    </div>
      )
}

export default Products
