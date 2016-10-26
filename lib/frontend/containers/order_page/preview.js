"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _jquery = require("jquery");

var _preview = require("../../components/order_page/preview");

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PreviewOrder = function (_Component) {
  _inherits(PreviewOrder, _Component);

  function PreviewOrder() {
    _classCallCheck(this, PreviewOrder);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      isShowingModal: false,
      fetching: false
    };
    _this.content = { __html: '' };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  PreviewOrder.prototype.handleClick = function handleClick() {
    var _this2 = this;

    var previewData = function previewData(_ref) {
      var res = _ref.res;

      _this2.content = { __html: res };
      _this2.setState({ fetching: false });
    };

    var processOrder = function processOrder(cb) {
      _this2.setState({ fetching: true });
      (0, _jquery.ajax)({
        url: '/orders/143/preview'
      }).done(function (res, textStatus) {
        return cb({ res: res });
      }).fail(function (xhr, status, err) {
        return cb({ err: xhr.responseJSON, status: xhr.status });
      });
    };

    processOrder(previewData);
    this.setState({ isShowingModal: true });
  };

  PreviewOrder.prototype.handleClose = function handleClose() {
    this.setState({ isShowingModal: false });
  };

  PreviewOrder.prototype.render = function render() {
    var isShowingModal = this.state.isShowingModal;

    return _react2.default.createElement(_preview2.default, {
      onClose: this.handleClose,
      isShowing: isShowingModal,
      content: this.content,
      onClick: this.handleClick
    });
  };

  return PreviewOrder;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PreviewOrder);
//# sourceMappingURL=preview.js.map