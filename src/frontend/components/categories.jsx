import React from "react";
import { Link } from "react-router";

import CategoryItem from "./category_item";
import SubCategoriesModal from "../containers/sub_categories_modal";

const Categories = ({label, type}) => {
  let visiting_card = 'Visiting Card';
  let broucher = 'Broucher';
  let stationary = 'Stationary';
  let flyers = 'Flyers';

  return (
    <div className='main-section-body'>
      <div className='left-panel category'>
        <div className='inner-section main' id='print-type'>
          <h2>{ label }</h2>
          <div>
            <SubCategoriesModal
              type='visiting_card'
              label={visiting_card}
              imgSrc='/assets/round2.png'
              categoryClass='category'
            />
            <Link
              to='/order/broucher'
              className='item-box'>
              <CategoryItem
                label={broucher}
                imgSrc='/assets/round3.png'
                categoryClass='category'
              />
            </Link>
            <SubCategoriesModal
              type='stationary'
              label={stationary}
              imgSrc='/assets/round1.png'
              categoryClass='category'
            />
            <SubCategoriesModal
              type='flyers'
              label={flyers}
              imgSrc='/assets/round4.png'
              categoryClass='category'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
