import React from "react";
import { connect } from "react-redux";

import TextInputContainer from "../components/text_input";
import { QUANTITY, setQuantity } from "../actions/index";

class TextInput extends React.Component {
  getLabelString(category) {
    let label;

    switch(category) {
      case QUANTITY:
        label = 'Print Quantity';
        break;
    }

    return { localLabel: label };
  }

  render() {
    let { category, label, value = 0, onChange } = this.props;

    let {localLabel} = this.getLabelString(category);
    label = label ? label : localLabel;

    return <TextInputContainer
      label={label}
      value={value}
      onChange={onChange} />
  }
}

const mapStateToProps = (orderApp, ownProps) => {
  return {
    value: orderApp.selectionState[ownProps.category]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(ownProps.onUpdate(e.target.value));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextInput);
