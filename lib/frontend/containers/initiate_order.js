"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _customer_details = require("./customer_details");

var _customer_details2 = _interopRequireDefault(_customer_details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InitiateOrder = function (_Component) {
  _inherits(InitiateOrder, _Component);

  function InitiateOrder() {
    _classCallCheck(this, InitiateOrder);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  InitiateOrder.prototype.componentWillMount = function componentWillMount() {
    var onload = this.props.onload;
  };

  InitiateOrder.prototype.render = function render() {
    var _props = this.props;
    var product = _props.product;
    var pathname = _props.pathname;


    return _react2.default.createElement(
      "div",
      { className: "main-section-body" },
      product ? _react2.default.createElement(_customer_details2.default, { pathname: pathname, product: product }) : _react2.default.createElement(_Redirect2.default, { to: {
          pathname: '/order/products',
          state: { from: this.props.location }
        } })
    );
  };

  return InitiateOrder;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var product = store.product;
  var state = ownProps.location.state;

  var stateType = state && state.type && state.type.key ? state.type : undefined;
  var productType = product && product.key ? product : undefined;

  return {
    product: stateType || productType
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(InitiateOrder);
//# sourceMappingURL=initiate_order.js.map