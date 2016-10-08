"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

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

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  CustomerDetailsPage.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var onload = _props.onload;
    var _props$product = _props.product;
    var key = _props$product.key;
    var value = _props$product.value;

    onload(key, value);
  };

  CustomerDetailsPage.prototype.handleChange = function handleChange(e) {
    var _props2 = this.props;
    var setCustomerDetails = _props2.setCustomerDetails;
    var customer = _props2.customer;
    var _e$target = e.target;
    var name = _e$target.name;
    var value = _e$target.value;


    if (customer[name] !== value) {
      setCustomerDetails(name, value);
    }
  };

  CustomerDetailsPage.prototype.handleSelect = function handleSelect(e) {
    var _props3 = this.props;
    var customer = _props3.customer;
    var setCustomerDetails = _props3.setCustomerDetails;

    var selected = e.value;

    if (customer.category !== selected) {
      setCustomerDetails('category', selected);
    }
  };

  CustomerDetailsPage.prototype.render = function render() {
    var _props4 = this.props;
    var pathname = _props4.pathname;
    var _props4$product = _props4.product;
    var key = _props4$product.key;
    var value = _props4$product.value;
    var customer = _props4.customer;
    var message = _props4.message;
    var categories = _props4.categories;

    var optionNodes = categories.map(function (category) {
      return { value: category.name, label: category.description };
    });

    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_product_title2.default, { pathname: pathname, label: value }),
      _react2.default.createElement(_customer_details2.default, {
        pathname: pathname,
        onChange: this.handleChange,
        data: customer,
        message: message,
        onSelect: this.handleSelect,
        optionNodes: optionNodes

      })
    );
  };

  return CustomerDetailsPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    customer: store.customer,
    message: store.error.message || {},
    categories: store.categories || []
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onload: function onload(key, value) {
      dispatch((0, _actions.setProduct)(key, value));
    },
    setCustomerDetails: function setCustomerDetails(key, value) {
      dispatch((0, _actions.updateCustomerDetails)(key, value));
      dispatch((0, _actions.updateCustomerFormStatus)(true));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomerDetailsPage);
//# sourceMappingURL=customer_details.js.map