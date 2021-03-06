"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _product_title = require("../components/product_title");

var _product_title2 = _interopRequireDefault(_product_title);

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
    _this.onAddAlbum = _this.onAddAlbum.bind(_this);
    return _this;
  }

  ProcessOrderPage.prototype.handleClick = function handleClick() {
    var _this2 = this;

    var _props = this.props,
        order = _props.order,
        albums = _props.albums;

    var orderdata = { order_id: order.id };

    Object.keys(albums).forEach(function (albumId) {
      return orderdata[albumId] = albums[albumId].name;
    });
    (0, _actions.processOrder)(orderdata, function () {
      return _this2.setState({ formSubmit: true });
    });
  };

  ProcessOrderPage.prototype.onAddAlbum = function onAddAlbum() {
    var _props2 = this.props,
        addAlbumToStore = _props2.addAlbumToStore,
        order = _props2.order;


    (0, _actions.addAlbum)({ order_id: order.id }, function (_ref) {
      var res = _ref.res;
      var id = res.id,
          name = res.name,
          priority = res.priority;

      addAlbumToStore(id, name, priority);
    });
  };

  ProcessOrderPage.prototype.render = function render() {
    var _props3 = this.props,
        order = _props3.order,
        pathname = _props3.pathname,
        product = _props3.product,
        albums = _props3.albums,
        location = _props3.location;
    var value = product.value;


    return this.state.formSubmit ? _react2.default.createElement(_Redirect2.default, {
      to: {
        pathname: "/order/confirm",
        state: { from: location }
      },
      push: true
    }) : _react2.default.createElement(
      "div",
      { className: "main-section-body" },
      _react2.default.createElement(_product_title2.default, { pathname: pathname, label: value, orderId: order.id }),
      _react2.default.createElement(_process_order2.default, {
        pathname: pathname,
        onClick: this.handleClick,
        albums: albums,
        addAlbum: this.onAddAlbum
      })
    );
  };

  return ProcessOrderPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var order = store.order,
      albums = store.albums;


  return {
    order: order,
    albums: albums,
    product: order.product
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addAlbumToStore: function addAlbumToStore(id, name, priority) {
      dispatch((0, _actions.addAlbumToImage)(id, name, priority));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProcessOrderPage);