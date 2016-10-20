"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _product_title = require("../components/product_title");

var _product_title2 = _interopRequireDefault(_product_title);

var _customer_details = require("../components/customer_details");

var _customer_details2 = _interopRequireDefault(_customer_details);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import DOMPurify from "dompurify"

var CustomerDetailsPage = function (_Component) {
  _inherits(CustomerDetailsPage, _Component);

  function CustomerDetailsPage() {
    _classCallCheck(this, CustomerDetailsPage);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = { navigate: false };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.addOrder = _this.addOrder.bind(_this);
    return _this;
  }

  CustomerDetailsPage.prototype.handleChange = function handleChange(e) {
    var _props = this.props;
    var setCustomerDetails = _props.setCustomerDetails;
    var customer = _props.customer;
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;


    if (customer[name] !== value) {
      setCustomerDetails(name, value);
    }
  };

  CustomerDetailsPage.prototype.handleSelect = function handleSelect(e) {
    var _props2 = this.props;
    var customer = _props2.customer;
    var setCustomerDetails = _props2.setCustomerDetails;

    var selected = e.value;

    if (customer.category !== selected) {
      setCustomerDetails('category', selected);
    }
  };

  CustomerDetailsPage.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var _props3 = this.props;
    var customer = _props3.customer;
    var orderid = _props3.orderid;
    var product = _props3.product;
    var updateOrderToStore = _props3.updateOrderToStore;
    var clearErrors = _props3.clearErrors;

    var orderData = this.prepareOrderData(customer, product);

    if (orderid && customer.dirty) {
      updateOrderToStore();
      this.setState({ navigate: true });
    } else if (!orderid) {
      clearErrors();
      (0, _actions.createOrder)(orderData, this.addOrder);
    } else {
      this.setState({ navigate: true });
    }
  };

  CustomerDetailsPage.prototype.prepareOrderData = function prepareOrderData(customer, product) {
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

  CustomerDetailsPage.prototype.addOrder = function addOrder(_ref) {
    var err = _ref.err;
    var res = _ref.res;
    var _props4 = this.props;
    var setErrorInStore = _props4.setErrorInStore;
    var addOrderToStore = _props4.addOrderToStore;

    if (err) {
      setErrorInStore(err);
    } else {

      if (res) {
        addOrderToStore(res);
        this.setState({ navigate: true });
      }
    }
  };

  CustomerDetailsPage.prototype.render = function render() {
    var _props5 = this.props;
    var pathname = _props5.pathname;
    var customer = _props5.customer;
    var message = _props5.message;
    var categories = _props5.categories;
    var product = _props5.product;
    var location = _props5.location;

    var optionNodes = categories.map(function (category) {
      return { value: category.name, label: category.description };
    });

    var value = product.value;


    return this.state.navigate ? _react2.default.createElement(_Redirect2.default, {
      to: {
        pathname: "/order/process",
        state: { from: location }
      },
      push: true
    }) : _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_product_title2.default, { pathname: pathname, label: value, edit: true }),
      _react2.default.createElement(_customer_details2.default, {
        pathname: pathname,
        onChange: this.handleChange,
        data: customer,
        message: message,
        onSelect: this.handleSelect,
        optionNodes: optionNodes,
        onSubmit: this.handleSubmit
      })
    );
  };

  return CustomerDetailsPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    customer: store.customer,
    message: store.error.message || {},
    categories: store.categories || [],
    orderid: store.order.id,
    product: store.product
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    setCustomerDetails: function setCustomerDetails(key, value) {
      dispatch((0, _actions.updateCustomerDetails)(key, value));
      dispatch((0, _actions.updateCustomerFormStatus)(true));
    },
    addOrderToStore: function addOrderToStore(res) {
      dispatch((0, _actions.updateOrder)({
        orderData: { id: res.order_id },
        albumData: { id: res.id, name: res.name, priority: res.priority },
        dirty: false
      }));
      // dispatch(updateCustomerFormStatus(false))
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomerDetailsPage);
//# sourceMappingURL=customer_details.js.map