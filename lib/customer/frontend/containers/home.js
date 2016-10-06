"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Home.prototype.render = function render() {
    var order = this.props.order;


    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "h1",
        null,
        "Yahooooooo"
      ),
      _react2.default.createElement(
        "div",
        null,
        "Product name: ",
        order.product
      ),
      _react2.default.createElement(
        "div",
        null,
        "Category: ",
        order.category
      ),
      _react2.default.createElement(
        "div",
        null,
        "Photographer: ",
        order.photographer
      ),
      _react2.default.createElement(
        "div",
        null,
        "Status: ",
        order.orderstatus
      )
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