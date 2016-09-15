import React from "react";
import { connect } from "react-redux";

import DropdownComponent from "../components/dropdown";
import { SIZE, SURFACE, COATING, PAPER_QUALITY, FOLD, QUANTITY, FILES } from "../actions/index";

class DropDownContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.shouldUpdate;
  }

  getLabelString(category) {
    let label, placeholder;

    switch(category) {
      case SIZE:
        label = 'Print Size';
        placeholder = 'Select Size...';
        break;
      case PAPER_QUALITY:
        label = 'Paper Quality';
        placeholder = 'Select Paper Quality ...';
        break;
      case COATING:
        label = 'Coating';
        placeholder = 'Select Coating Type ...';
        break;
      case FOLD:
        label = 'Print Fold';
        placeholder = 'Select number of folds ...';
        break;
      case QUANTITY:
        label = 'Print Quantity';
        placeholder = 'Select Quantity ...';
        break;
      case FILES:
        label = 'Print Design';
        placeholder = 'Drop your files here, or click anywhere in this box to select files to upload';
        break;
      case SURFACE:
        label = 'Print Material';
        placeholder = 'Select Material ...';
        break;
    }

    return { localLabel: label, localPlaceholder: placeholder };
  }

  getLabelForValue(val, optionButtonNodes) {
    if(!val) return;

    let node = optionButtonNodes.find(entry => entry.value === val);
    return node.label;
  }

  render() {
    let { category, filter, itemList, label, placeholder, onChange } = this.props;

    let optionButtonNodes = itemList.map((entry) => {
      let selected = filter === entry.id ? true : false;
      return {value: entry.id, label: entry.value};
    });

    let {localLabel, localPlaceholder} = this.getLabelString(category);
    let selected = this.getLabelForValue(filter, optionButtonNodes);

    label = label ? label : localLabel;
    placeholder = placeholder ? placeholder : localPlaceholder;

    let state = {label, selected, optionButtonNodes, placeholder};

    return <DropdownComponent
      state={state}
      onClick={onChange} />
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  let state = orderApp.selectionState;

  return {
    filter: state[ownProps.category],
    shouldUpdate: state.updateComponents.indexOf(ownProps.category) > -1
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (selectBox) => {
      let { selected, onSelect } = ownProps;

      if(onSelect && selected !== selectBox.value) {
        dispatch(onSelect(selectBox.value))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownContainer);
