'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Match = require('react-router/Match');

var _Match2 = _interopRequireDefault(_Match);

var _Redirect = require('react-router/Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CreateOrder = function (_Component) {
  _inherits(CreateOrder, _Component);

  function CreateOrder() {
    _classCallCheck(this, CreateOrder);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.addOrder = _this.addOrder.bind(_this);
    _this.state = { err: undefined, fetching: false };
    return _this;
  }

  CreateOrder.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var customer = _props.customer;
    var orderid = _props.orderid;
    var product = _props.product;
    var updateOrderToStore = _props.updateOrderToStore;
    var clearErrors = _props.clearErrors;

    var orderData = this.prepareOrderData(customer, product);

    if (orderid && customer.dirty) {
      this.setState({ fetching: true });
      updateOrderToStore();
      this.setState({ fetching: false });
    } else if (!orderid) {
      this.setState({ fetching: true });
      (0, _actions.createOrder)(orderData, this.addOrder);
      clearErrors();
    }
  };

  CreateOrder.prototype.prepareOrderData = function prepareOrderData(customer, product) {
    var cust_name = customer.cust_name;
    var email = customer.email;
    var phone_number = customer.phone_number;
    var category = customer.category;
    var image_count = customer.image_count;

    var nameParts = cust_name ? cust_name.split(" ") : undefined;
    var first_name = cust_name,
        last_name = '';

    if (nameParts && nameParts.length >= 2) {
      last_name = nameParts.pop();
      first_name = nameParts.join(' ');
    }

    return {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      category: category,
      product: product.key,
      image_count: image_count
    };
  };

  CreateOrder.prototype.addOrder = function addOrder(_ref) {
    var err = _ref.err;
    var res = _ref.res;
    var _props2 = this.props;
    var setErrorInStore = _props2.setErrorInStore;
    var addOrderToStore = _props2.addOrderToStore;

    if (err) {
      this.setState({ err: err, fetching: false });
      setErrorInStore(err);
    } else {

      if (res) {
        addOrderToStore(res);
      }
      this.setState({ fetching: false });
    }
  };

  CreateOrder.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props;
    var Component = _props3.component;

    var rest = _objectWithoutProperties(_props3, ['component']);

    return _react2.default.createElement(_Match2.default, _extends({}, rest, { render: function render(props) {
        return _this2.state.fetching ? _react2.default.createElement(
          'div',
          { className: 'busy-icon' },
          _react2.default.createElement('img', { src: '/assets/spinning_clock.gif' })
        ) : _this2.state.err ? _react2.default.createElement(_Redirect2.default, { to: {
            pathname: '/order',
            state: { from: props.location }
          } }) : _react2.default.createElement(_Redirect2.default, { to: {
            pathname: '/order/process',
            state: { from: props.location }
          } });
      } }));
  };

  return CreateOrder;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    customer: store.customer,
    orderid: store.order.id,
    product: store.product
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    addOrderToStore: function addOrderToStore(res) {
      dispatch((0, _actions.updateOrder)('id', res.order_id));
      dispatch((0, _actions.updateCustomerFormStatus)(false));
      dispatch((0, _actions.clearAllErrors)());
    },

    updateOrderToStore: function updateOrderToStore() {
      dispatch((0, _actions.updateCustomerFormStatus)(false));
    },

    setErrorInStore: function setErrorInStore(err) {
      dispatch((0, _actions.setError)(err));
    },

    clearErrors: function clearErrors() {
      return dispatch((0, _actions.clearAllErrors)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CreateOrder);
//# sourceMappingURL=create_order.js.map