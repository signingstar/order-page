"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _header_panel = require("../components/header_panel");

var _header_panel2 = _interopRequireDefault(_header_panel);

var _main_panel = require("../components/main_panel");

var _main_panel2 = _interopRequireDefault(_main_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, _Component.call(this));
  }

  Home.prototype.render = function render() {
    var _props = this.props;
    var order = _props.order;
    var images = _props.images;
    var pathname = _props.pathname;
    var pattern = _props.pattern;
    var params = _props.params;
    var usersHash = params.usersHash;
    var orderId = params.orderId;

    var homePage = pattern !== '/order/:usersHash/:orderId/:fileName';
    var role = order.role;


    if (!homePage) return null;

    return _react2.default.createElement(
      "div",
      { className: "panels" },
      _react2.default.createElement(_header_panel2.default, { order: order }),
      _react2.default.createElement(_main_panel2.default, _extends({ order: order }, params))
    );
  };

  return Home;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    order: store.order
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);
//# sourceMappingURL=home.js.map