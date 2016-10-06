import React from "react"
import Link from "react-router/Link"

import ProductItem from "./product_item"

const Products = ({label, pathname}) => {
  let retouching = 'Image Retouching'
  let printing = 'Album Printing'

  return (
    <div className='main-section-body products'>
      <div>
        <Link
          to={{
            pathname: '/order',
            state: {type: {key: 'retouching', value: retouching}}
          }}
          className='item-box'
        >
          <ProductItem
            label={retouching}
            imgSrc='/assets/round3.png'
            categoryClass='category'
          />
        </Link>
      </div>
      <div>
        <Link
          to={{
            pathname: '/order',
            state: {type: {key: 'printing', value: printing}}
          }}
          className='item-box'
        >
          <ProductItem
            label={printing}
            imgSrc='/assets/round2.png'
            categoryClass='category'
          />
        </Link>
      </div>
    </div>
      )
}

export default Products
