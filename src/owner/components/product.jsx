import React from "react"
import Link from "react-router-dom/Link"

import ProductItem from "./product_item"

const Products = ({pathname, items}) => {
  const linkNodes = items.map(item => {
    let imgSrc = '/assets/round3.png'
    switch(item.name) {
      case 'wedding_album':
        imgSrc = '/assets/wedding.jpg'
        break
      case 'post_processing':
        imgSrc = '/assets/post_processing.png'
        break
      case 'retouching':
        imgSrc = '/assets/retouching.png'
        break
      case 'portrait_album':
        imgSrc = '/assets/portrait.png'
        break
    }

    return (
      <ProductItem
        key={item.id}
        item={item}
        imgSrc={imgSrc}
      />
    )
  })

  return (
    <div className='main-section-body products'>
      {linkNodes}
    </div>
  )
}

export default Products
