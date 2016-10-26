"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _order_view = require("../../components/order_page/order_view");

var _order_view2 = _interopRequireDefault(_order_view);

var _actions = require("../../actions");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrepareOrderPage = function (_Component) {
  _inherits(PrepareOrderPage, _Component);

  function PrepareOrderPage() {
    _classCallCheck(this, PrepareOrderPage);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  PrepareOrderPage.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var albums = _props.albums;
    var setImageList = _props.setImageList;


    setImageList((0, _utils.imageMapToList)(albums));
  };

  PrepareOrderPage.prototype.render = function render() {
    var _props2 = this.props;
    var order = _props2.order;
    var customer = _props2.customer;


    return _react2.default.createElement(_order_view2.default, { order: order, customer: customer });
  };

  return PrepareOrderPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var order = store.order;
  var albums = store.albums;


  return {
    order: order,
    customer: order.customer,
    albums: albums
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setImageList: function setImageList(list) {
      dispatch((0, _actions.populateImageList)(list));
    }

  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PrepareOrderPage);
//# sourceMappingURL=order_view.js.map