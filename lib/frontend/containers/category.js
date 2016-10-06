"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _navigation = require("../components/navigation");

var _navigation2 = _interopRequireDefault(_navigation);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Product = function (_Component) {
  _inherits(Product, _Component);

  function Product() {
    _classCallCheck(this, Product);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Product.prototype.componentWillMount = function componentWillMount() {
    var onload = this.props.onload;

    onload();
  };

  Product.prototype.render = function render() {
    var pathname = this.props.pathname;

    return _react2.default.createElement(_navigation2.default, null);
  };

  return Product;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onload: function onload() {
      dispatch((0, _actions.resetProduct)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Product);
//# sourceMappingURL=category.js.map