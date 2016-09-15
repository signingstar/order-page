import React from "react";
import { Link } from "react-router";

import CategoryItem from "../../components/category_item";

const SubCategories = ({label}) => {
  return (
    <div>
      <Link to="/order/letterhead" className='item-box'>
        <CategoryItem imgSrc="/assets/letterhead.png" label='LetterHead' categoryClass='sub-category' />
      </Link>
      <Link to="/order/envelope" className='item-box'>
        <CategoryItem imgSrc="/assets/envelope.jpg" label='Envelope' categoryClass='sub-category' />
      </Link>
      <Link to="/order/notebook" className='item-box'>
        <CategoryItem imgSrc="/assets/notepad.jpg" label='Notebook' categoryClass='sub-category' />
      </Link>
    </div>
  );
}

export default SubCategories;
