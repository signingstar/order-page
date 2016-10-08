"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _process_order = require("../components/process_order");

var _process_order2 = _interopRequireDefault(_process_order);

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

    var _props = this.props;
    var images = _props.images;
    var order = _props.order;

    var formData = new FormData();

    formData.append('order_id', order && order.id ? order.id : 64);

    images.map(function (image) {
      formData.append('images', image);
    });

    (0, _actions.processOrder)(formData, function () {
      return _this2.setState({ formSubmit: true });
    });
  };

  ProcessOrderPage.prototype.render = function render() {
    var pathname = this.props.pathname;

    if (this.state.formSubmit) {
      return _react2.default.createElement(_Redirect2.default, { to: {
          pathname: "/order/confirm",
          state: { from: this.props.location }
        } });
    }

    return _react2.default.createElement(_process_order2.default, { pathname: pathname, onClick: this.handleClick });
  };

  return ProcessOrderPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    order: store.order,
    images: store.images
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ProcessOrderPage);
//# sourceMappingURL=process_order.js.map