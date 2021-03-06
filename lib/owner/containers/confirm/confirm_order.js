"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _confirm_order = require("../../components/confirm/confirm_order");

var _confirm_order2 = _interopRequireDefault(_confirm_order);

var _actions = require("../../actions");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmOrderPage = function (_Component) {
  _inherits(ConfirmOrderPage, _Component);

  function ConfirmOrderPage() {
    _classCallCheck(this, ConfirmOrderPage);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      formSubmit: false
    };

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  ConfirmOrderPage.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        albums = _props.albums,
        setImageList = _props.setImageList;


    setImageList((0, _utils.imageMapToList)(albums));
  };

  ConfirmOrderPage.prototype.handleClick = function handleClick() {
    var _this2 = this;

    var _props$order = this.props.order,
        id = _props$order.id,
        name = _props$order.name,
        category = _props$order.category;


    (0, _actions.confirmOrder)({
      order_id: id,
      order_name: name,
      category: category
    }, function () {
      return _this2.setState({ formSubmit: true });
    });
  };

  ConfirmOrderPage.prototype.handleChange = function handleChange(e) {
    this.props.updateOrderParam({ name: e.target.value });
  };

  ConfirmOrderPage.prototype.handleSelect = function handleSelect(e) {
    var _props2 = this.props,
        order = _props2.order,
        updateOrderParam = _props2.updateOrderParam;

    var selected = e.value;

    if (order.category !== selected) {
      updateOrderParam({ category: selected });
    }
  };

  ConfirmOrderPage.prototype.render = function render() {
    var _props3 = this.props,
        pathname = _props3.pathname,
        categories = _props3.categories,
        order = _props3.order;


    var optionNodes = categories.map(function (_ref) {
      var id = _ref.id,
          description = _ref.description;

      return { value: id, label: description };
    });

    return this.state.formSubmit ? _react2.default.createElement(_Redirect2.default, {
      to: {
        pathname: "/order/submit",
        state: { from: this.props.location }
      },
      push: true
    }) : _react2.default.createElement(_confirm_order2.default, {
      pathname: pathname,
      onClick: this.handleClick,
      orderName: order.name || "Order-" + order.id,
      handleChange: this.handleChange,
      onSelect: this.handleSelect,
      optionNodes: optionNodes,
      category: order.category
    });
  };

  return ConfirmOrderPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var order = store.order,
      categories = store.categories,
      albums = store.albums,
      _store$imageList = store.imageList,
      imageList = _store$imageList === undefined ? [] : _store$imageList;


  return {
    order: order,
    categories: categories,
    albums: albums,
    imageList: imageList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setImageList: function setImageList(list) {
      dispatch((0, _actions.populateImageList)(list));
    },

    updateOrderParam: function updateOrderParam(param) {
      dispatch((0, _actions.setOrderParam)(param));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConfirmOrderPage);