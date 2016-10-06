import React from "react";
import { Link } from "react-router";

import CategoryItem from "../../components/category_item";

const SubCategories = ({label}) => {
  return (
    <div>
      <Link to="/order/visitingcard" className='item-box'>
        <CategoryItem imgSrc="/assets/round2.png" label='Landscape' categoryClass='sub-category' />
      </Link>
      <Link to="/order/visitingcard?alignment=vertical" className='item-box'>
        <CategoryItem imgSrc="/assets/portrait_visiting.png" label='Portrait' categoryClass='sub-category' />
      </Link>
    </div>
  );
}

export default SubCategories;
