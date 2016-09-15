import React from "react";
import { connect } from "react-redux";

import OrderPresenter from "../../presenter";
import PrintData from "./print_combination";
import Component from "./component";

import { CATEGORY, SIZE, SURFACE, COATING, QUANTITY, setAllCategories } from "../../actions/index";

class Flyers extends React.Component {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.presenter = new OrderPresenter(PrintData);
  }

  getCategories(location) {
    const orderPath = /^\/order[\/]?([a-z]+)\-([a-z0-9\-]*)$/;
    location.pathname.match(orderPath);

    let category = RegExp.$1;
    let subCategory = RegExp.$2;

    return { category, subCategory };
  }

  componentDidMount() {
    let { categoryFromStore, location, setCategories } = this.props;
    let {category, subCategory} = this.getCategories(location);

    if(category !== categoryFromStore) {
      setCategories(category);
    }
  }

  getLabelForFields({ category, size, material, coat, quantity }) {
    let typeLabel = this.presenter.fetchLabelForCategoryAndId(CATEGORY, category);
    let sizeLabel = this.presenter.fetchLabelForCategoryAndId(SIZE, size);
    let materialLabel = this.presenter.fetchLabelForCategoryAndId(SURFACE, material);
    let coatLabel = this.presenter.fetchLabelForCategoryAndId(COATING, coat);
    let quantityLabel = this.presenter.fetchLabelForCategoryAndId(QUANTITY, quantity);

    let labelMap = new Map();
    labelMap.set(SIZE, {label: 'Print Size', value: sizeLabel});
    labelMap.set(SURFACE, {label: 'Paper Material', value: materialLabel});
    labelMap.set(COATING, {label: 'Coating', value: coatLabel});
    labelMap.set(QUANTITY, {label: 'Quantity', value: quantityLabel});

    return {
      category: typeLabel,
      fieldsMap: labelMap
    }
  }

  render() {
    let { size, material, coat, quantity, location } = this.props;
    let category = this.category || this.getCategories(location).subCategory;

    let sizeList = this.presenter.printableDataWithFilter(SIZE, {category});
    let materialList = this.presenter.printableDataWithFilter(SURFACE, {category, size});
    let coatList = this.presenter.printableDataWithFilter(COATING, {category, size, material});
    let quantityList = this.presenter.printableDataWithFilter(QUANTITY, {category, size, material});

    let fieldsLabel = this.getLabelForFields({ category, size, material, coat, quantity });
    let filtersList = { sizeList, materialList, coatList, quantityList };

    return (
      <Component filtersList={filtersList} fieldsLabel={fieldsLabel} category={category} />
    );
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  let { size, material, coat, quantity } = orderApp.selectionState;

  return {
    categoryFromStore: orderApp.categoryState.category,
    size,
    material,
    coat,
    quantity
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCategories: (category, subCategory) => {
      dispatch(setAllCategories(category, subCategory));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flyers);
