import React from "react";
import { connect } from "react-redux";

import OrderPresenter from "../../presenter";
import PrintData from "./print_combination";
import Envelope from "./envelope";
import LetterHead from "./envelope";
import Notebook from "./envelope";

import { CATEGORY, SIZE, SURFACE, COATING, QUANTITY, setCategory } from "../../actions/index";

class Container extends React.Component {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.presenter = new OrderPresenter(PrintData);
  }

  componentDidMount() {
    let { categoryFromStore, location, setCategories } = this.props;
    let {category, subCategory} = this.getCategories(location);

    if(category !== categoryFromStore) {
      setCategories(category);
    }
  }

  getComponent(category, filterList, fieldsLabel) {
    let component;

    switch (category) {
      case 'envelope':
        component = <Envelope filterList={filterList} fieldsLabel={fieldsLabel} />;
        break;
      case 'letterhead':
        component = <LetterHead filterList={filterList} fieldsLabel={fieldsLabel} />;
        break;
      case 'notebook':
        component = <Notebook filterList={filterList} fieldsLabel={fieldsLabel} />;
        break;
      default:
        return <h1>No Container Found</h1>
    }

    return component;
  }

  getCategories(location) {
    const orderPath = /^\/order[\/]?([a-z]+)[a-z0-9\-]*$/;
    location.pathname.match(orderPath);

    let category = RegExp.$1;

    return { category };
  }

  getLabelForFields({ category, size, material, coat, quantity }) {
    let categoryLabel = this.presenter.fetchLabelForCategoryAndId(CATEGORY, category);
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
      category: categoryLabel,
      fieldsMap: labelMap
    }
  }

  getFilterList({ category, size, material, coat, quantity }) {
    let sizeList = this.presenter.printableDataWithFilter(SIZE, {category});
    let materialList = this.presenter.printableDataWithFilter(SURFACE, {category, size});
    let coatList = this.presenter.printableDataWithFilter(COATING, {category, size, material});
    let quantityList = this.presenter.printableDataWithFilter(QUANTITY, {category, size, material});

    return {sizeList, materialList, coatList, quantityList};
  }

  render() {
    let { size, material, coat, quantity, location } = this.props;
    let category = this.category || this.getCategories(location).category;

    let filterList = this.getFilterList(this.props);
    let fieldsLabel = this.getLabelForFields({ category, size, material, coat, quantity });

    return this.getComponent(category, filterList, fieldsLabel);
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
    setCategories: (category) => {
      dispatch(setCategory(category));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
