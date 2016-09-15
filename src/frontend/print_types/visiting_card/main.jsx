import React from "react";
import { connect } from "react-redux";

import OrderPresenter from "../../presenter";
import PrintData from "./print_combination";
import Component from "./component";

import { CATEGORY, PAPER_QUALITY, COATING, QUANTITY, setCategory } from "../../actions/index";

class VisitingCard extends React.Component {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.presenter = new OrderPresenter(PrintData);
  }

  getCategories(location) {
    let {pathname, query} = location;
    const orderPath = /^\/order[\/]?([a-z]+)[a-z0-9\-]*$/;

    pathname.match(orderPath);

    let category = RegExp.$1;
    if(query && query.alignment) {
      category = `${category}-${query.alignment}`;
    }

    return { category };
  }

  componentDidMount() {
    let { categoryFromStore, location, setCategories } = this.props;
    let { category, subCategory } = this.getCategories(location);

    if(category !== categoryFromStore) {
      setCategories(category);
    }
  }

  getLabelForFields({ category, paper_quality, coat, quantity }) {
    let typeLabel = this.presenter.fetchLabelForCategoryAndId(CATEGORY, category);
    let paperQualityLabel = this.presenter.fetchLabelForCategoryAndId(PAPER_QUALITY, paper_quality);
    let coatLabel = this.presenter.fetchLabelForCategoryAndId(COATING, coat);

    let labelMap = new Map();
    labelMap.set(PAPER_QUALITY, {label: 'Paper Quality', value: paperQualityLabel});
    labelMap.set(COATING, {label: 'Coating', value: coatLabel});
    labelMap.set(QUANTITY, {label: 'Quantity', value: quantity});

    return {
      category: typeLabel,
      fieldsMap: labelMap
    }
  }

  render() {
    let { size, paper_quality, coat, quantity, location } = this.props;
    let category = this.category || this.getCategories(location).category;

    let coatList = this.presenter.printableDataWithFilter(COATING);
    let quantityList = this.presenter.printableDataWithFilter(QUANTITY);
    let paperQualityList = this.presenter.printableDataWithFilter(PAPER_QUALITY);

    let fieldsLabel = this.getLabelForFields({ category, paper_quality, coat, quantity });

    return <Component
      coatList={coatList}
      paperQualityList={paperQualityList}
      quantityList={quantityList}
      fieldsLabel={fieldsLabel} />
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  let { coat, paper_quality, quantity } = orderApp.selectionState;

  return {
    categoryFromStore: orderApp.categoryState.category,
    coat,
    paper_quality,
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
)(VisitingCard);
