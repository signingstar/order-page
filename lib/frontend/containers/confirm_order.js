"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _confirm_order = require("../components/confirm_order");

var _confirm_order2 = _interopRequireDefault(_confirm_order);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessOrderPage = function (_Component) {
  _inherits(ProcessOrderPage, _Component);

  function ProcessOrderPage() {
    _classCallCheck(this, ProcessOrderPage);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      formSubmit: false
    };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ProcessOrderPage.prototype.handleClick = function handleClick() {
    var _this2 = this;

    var order = this.props.order;

    (0, _actions.confirmOrder)({ order_id: order.id }, function () {
      return _this2.setState({ formSubmit: true });
    });
  };

  ProcessOrderPage.prototype.render = function render() {
    var pathname = this.props.pathname;

    if (this.state.formSubmit) {
      return _react2.default.createElement(_Redirect2.default, { to: {
          pathname: "/order/submit",
          state: { from: this.props.location }
        } });
    }

    return _react2.default.createElement(_confirm_order2.default, { pathname: pathname, onClick: this.handleClick });
  };

  return ProcessOrderPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    order: store.order
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ProcessOrderPage);
//# sourceMappingURL=confirm_order.js.map