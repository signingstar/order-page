"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _text_input = require("../components/text_input");

var _text_input2 = _interopRequireDefault(_text_input);

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput() {
    _classCallCheck(this, TextInput);

    return _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).apply(this, arguments));
  }

  _createClass(TextInput, [{
    key: "getLabelString",
    value: function getLabelString(category) {
      var label = void 0;

      switch (category) {
        case _index.QUANTITY:
          label = 'Print Quantity';
          break;
      }

      return { localLabel: label };
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var category = _props.category;
      var label = _props.label;
      var _props$value = _props.value;
      var value = _props$value === undefined ? 0 : _props$value;
      var onChange = _props.onChange;

      var _getLabelString = this.getLabelString(category);

      var localLabel = _getLabelString.localLabel;

      label = label ? label : localLabel;

      return _react2.default.createElement(_text_input2.default, {
        label: label,
        value: value,
        onChange: onChange });
    }
  }]);

  return TextInput;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(orderApp, ownProps) {
  return {
    value: orderApp.selectionState[ownProps.category]
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange: function onChange(e) {
      dispatch(ownProps.onUpdate(e.target.value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TextInput);