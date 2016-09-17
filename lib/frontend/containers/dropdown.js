"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _dropdown = require("../components/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDownContainer = function (_React$Component) {
  _inherits(DropDownContainer, _React$Component);

  function DropDownContainer() {
    _classCallCheck(this, DropDownContainer);

    return _possibleConstructorReturn(this, (DropDownContainer.__proto__ || Object.getPrototypeOf(DropDownContainer)).apply(this, arguments));
  }

  _createClass(DropDownContainer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.shouldUpdate;
    }
  }, {
    key: "getLabelString",
    value: function getLabelString(category) {
      var label = void 0,
          placeholder = void 0;

      switch (category) {
        case _index.SIZE:
          label = 'Print Size';
          placeholder = 'Select Size...';
          break;
        case _index.PAPER_QUALITY:
          label = 'Paper Quality';
          placeholder = 'Select Paper Quality ...';
          break;
        case _index.COATING:
          label = 'Coating';
          placeholder = 'Select Coating Type ...';
          break;
        case _index.FOLD:
          label = 'Print Fold';
          placeholder = 'Select number of folds ...';
          break;
        case _index.QUANTITY:
          label = 'Print Quantity';
          placeholder = 'Select Quantity ...';
          break;
        case _index.FILES:
          label = 'Print Design';
          placeholder = 'Drop your files here, or click anywhere in this box to select files to upload';
          break;
        case _index.SURFACE:
          label = 'Print Material';
          placeholder = 'Select Material ...';
          break;
      }

      return { localLabel: label, localPlaceholder: placeholder };
    }
  }, {
    key: "getLabelForValue",
    value: function getLabelForValue(val, optionButtonNodes) {
      if (!val) return;

      var node = optionButtonNodes.find(function (entry) {
        return entry.value === val;
      });
      return node.label;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var category = _props.category;
      var filter = _props.filter;
      var itemList = _props.itemList;
      var label = _props.label;
      var placeholder = _props.placeholder;
      var onChange = _props.onChange;


      var optionButtonNodes = itemList.map(function (entry) {
        return { value: entry.id, label: entry.value };
      });

      var _getLabelString = this.getLabelString(category);

      var localLabel = _getLabelString.localLabel;
      var localPlaceholder = _getLabelString.localPlaceholder;

      var selected = this.getLabelForValue(filter, optionButtonNodes);

      label = label ? label : localLabel;
      placeholder = placeholder ? placeholder : localPlaceholder;

      var state = { label: label, selected: selected, optionButtonNodes: optionButtonNodes, placeholder: placeholder };

      return _react2.default.createElement(_dropdown2.default, {
        state: state,
        onClick: onChange });
    }
  }]);

  return DropDownContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(orderApp, ownProps) {
  var state = orderApp.selectionState;

  return {
    filter: state[ownProps.category],
    shouldUpdate: state.updateComponents.indexOf(ownProps.category) > -1
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange: function onChange(selectBox) {
      var selected = ownProps.selected;
      var onSelect = ownProps.onSelect;


      if (onSelect && selected !== selectBox.value) {
        dispatch(onSelect(selectBox.value));
      }
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DropDownContainer);