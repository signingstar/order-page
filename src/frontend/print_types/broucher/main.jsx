import React from "react";
import { connect } from "react-redux";

import OrderPresenter from "../../presenter";
import PrintData from "./print_combination";
import { CATEGORY, PAPER_QUALITY, SURFACE, COATING, QUANTITY, FOLD, setCategory } from "../../actions/index";
import Component from "./component";

class Broucher extends React.Component {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.presenter = new OrderPresenter(PrintData);
  }

  getCategories(location) {
    const orderPath = /^\/order[\/]?([a-z]+)[a-z0-9\-]*$/;
    location.pathname.match(orderPath);

    let category = RegExp.$1;

    return { category };
  }

  componentDidMount() {
    let { categoryFromStore, location, setCategories } = this.props;
    let {category, subCategory} = this.getCategories(location);

    if(category !== categoryFromStore) {
      setCategories(category);
    }
  }

  getLabelForFields({ category, size, material, coat, quantity, paper_quality, fold }) {
    let typeLabel = this.presenter.fetchLabelForCategoryAndId(CATEGORY, category);
    let foldLabel = this.presenter.fetchLabelForCategoryAndId(FOLD, fold);
    let paperQualityLabel = this.presenter.fetchLabelForCategoryAndId(PAPER_QUALITY, paper_quality);
    let coatLabel = this.presenter.fetchLabelForCategoryAndId(COATING, coat);
    let quantityLabel = this.presenter.fetchLabelForCategoryAndId(QUANTITY, quantity);

    let labelMap = new Map();
    labelMap.set(FOLD, {label: 'Print Fold', value: foldLabel});
    labelMap.set(PAPER_QUALITY, {label: 'Paper Quality', value: paperQualityLabel});
    labelMap.set(COATING, {label: 'Coating', value: coatLabel});
    labelMap.set(QUANTITY, {label: 'Quantity', value: quantityLabel});

    return {
      category: typeLabel,
      fieldsMap: labelMap
    }
  }

  render() {
    let { location, paper_quality, fold, coat, quantity, setType } = this.props;
    let category = this.category || this.getCategories(location).category;

    let coatList = this.presenter.printableDataWithFilter(COATING);
    let foldList = this.presenter.printableDataWithFilter(FOLD);
    let quantityList = this.presenter.printableDataWithFilter(QUANTITY);
    let paperQualityList = this.presenter.printableDataWithFilter(PAPER_QUALITY);

    let fieldsLabel = this.getLabelForFields({ category, paper_quality, coat, fold, quantity });

    return <Component
      foldList={foldList}
      coatList={coatList}
      paperQualityList={paperQualityList}
      quantityList={quantityList}
      fieldsLabel={fieldsLabel} />
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  let { paper_quality, coat, fold, quantity } = orderApp.selectionState;

  return {
    categoryFromStore: orderApp.categoryState.category,
    paper_quality,
    coat,
    fold,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Broucher);
