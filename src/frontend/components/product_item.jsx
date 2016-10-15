import React from "react"
import Link from "react-router/Link"

import ProductItemTile from "./product_item_tile"

const ProductItem = ({item, imgSrc}) => (
  <div>
    <Link
      to={{
        pathname: '/order',
        state: {type: {key: item.id, value: item.description}}
      }}
      className='item-box'
    >
      <ProductItemTile
        label={item.description}
        imgSrc={imgSrc}
        categoryClass='category'
      />
    </Link>
  </div>
)

export default ProductItem
