import React from "react";
import { Link } from "react-router";

import CategoryItem from "../../components/category_item";

const SubCategories = ({label}) => {
  return (
    <div>
      <Link to="/order/flyers-short" className='item-box'>
        <CategoryItem imgSrc="/assets/round1.png" label='Short' categoryClass='sub-category' />
      </Link>
      <Link to="/order/flyers-short" className='item-box'>
        <CategoryItem imgSrc="/assets/round2.png" label='Medium' categoryClass='sub-category' />
      </Link>
      <Link to="/order/flyers-short" className='item-box'>
        <CategoryItem imgSrc="/assets/round3.png" label='Large' categoryClass='sub-category' />
      </Link>
    </div>
  );
}

export default SubCategories;
