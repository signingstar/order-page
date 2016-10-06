import React from "react";
import Modal from "react-modal";

import SubCategoriesContent from "./sub_categories_content";
import CategoryItem from "./category_item";

const customStyles = {
  content: {
    top          : '40%',
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    marginRight  : '-50%',
    transform    : 'translate(-50%, -50%)'
  },
  overlay: {}
};

const SubCategoriesComponent = ({onClick, onClose, isShowing, modalHeader, label, type, imgSrc, categoryClass}) => {
  return (
    <div className='item-box'>
      <a href='javascript:void(0)' onClick={onClick}>
        <CategoryItem
          label={label}
          imgSrc={imgSrc}
          categoryClass={categoryClass}
        />
      </a>
      <Modal
        isOpen={isShowing}
        onRequestClose={onClose}
        style={customStyles}
        portalClassName='abcd'>
        <SubCategoriesContent label={label} type={type} />
      </Modal>
    </div>
  );
}

export default SubCategoriesComponent;
