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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getPreciseSize = function getPreciseSize(size) {
  var unitFactor = 1024 * 1024 * 1024;
  return size ? size > unitFactor ? (size / unitFactor).toFixed(2) + ' GB' : (size / (1024 * 1024)).toFixed(2) + ' MB' : 0;
};

var ConfirmOrderPage = function (_Component) {
  _inherits(ConfirmOrderPage, _Component);

  function ConfirmOrderPage() {
    _classCallCheck(this, ConfirmOrderPage);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      formSubmit: false
    };

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ConfirmOrderPage.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var image = _props.image;
    var imageList = _props.imageList;
    var setImageList = _props.setImageList;

    if (imageList.length > 0 || Object.keys(image).length === 0) {
      return;
    }

    var keys = Object.keys(image).sort(function (id1, id2) {
      return image[id1].priority - image[id2].priority;
    });
    imageList = keys.map(function (albumId) {
      var _image$albumId = image[albumId];
      var id = _image$albumId.id;
      var name = _image$albumId.name;
      var priority = _image$albumId.priority;
      var files = _image$albumId.files;

      var size = files.length > 1 ? files.reduce(function (prev, curr) {
        return prev.size + curr.size;
      }) : files[0].size;
      return { id: albumId, priority: priority, name: name, count: files.length, size: getPreciseSize(size) };
    });

    setImageList(imageList);
  };

  ConfirmOrderPage.prototype.handleClick = function handleClick() {
    var _this2 = this;

    var order = this.props.order;

    (0, _actions.confirmOrder)({ order_id: order.id }, function () {
      return _this2.setState({ formSubmit: true });
    });
  };

  ConfirmOrderPage.prototype.render = function render() {
    var pathname = this.props.pathname;

    if (this.state.formSubmit) {
      return _react2.default.createElement(_Redirect2.default, { to: {
          pathname: "/order/submit",
          state: { from: this.props.location }
        } });
    }

    return _react2.default.createElement(_confirm_order2.default, {
      pathname: pathname,
      onClick: this.handleClick
    });
  };

  return ConfirmOrderPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    order: store.order,
    image: store.image,
    imageList: store.imageList || []
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setImageList: function setImageList(list) {
      dispatch((0, _actions.populateImageList)(list));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ConfirmOrderPage);
//# sourceMappingURL=confirm_order.js.map