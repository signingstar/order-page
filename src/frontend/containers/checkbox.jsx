import React from "react";
import { connect } from "react-redux";

import CheckboxComponent from "../components/checkbox";
import { QUANTITY, TEMPLATE, setQuantity } from "../actions/index";

class CheckboxContainer extends React.Component {
  getLabelString(category) {
    let label;

    switch(category) {
      case TEMPLATE:
        label = 'Save As Template';
        break;
    }

    return { localLabel: label };
  }

  render() {
    let { category, label, checked=false, onChange } = this.props;

    let {localLabel} = this.getLabelString(category);
    label = label ? label : localLabel;

    return <CheckboxComponent
      label={label}
      checked={checked}
      onChange={onChange} />
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  return {
    checked: orderApp.selectionState[ownProps.category]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(ownProps.onUpdate(e.target.checked));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckboxContainer);
