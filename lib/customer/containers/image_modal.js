"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Redirect = require("react-router/Redirect");

var _Redirect2 = _interopRequireDefault(_Redirect);

var _image_modal_tile = require("../containers/image_modal_tile");

var _image_modal_tile2 = _interopRequireDefault(_image_modal_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageModal = function (_Component) {
  _inherits(ImageModal, _Component);

  function ImageModal() {
    _classCallCheck(this, ImageModal);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {};

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  ImageModal.prototype.componentWillMount = function componentWillMount() {
    var params = this.props.match.params;


    if (params.fileName.length > 10) {
      this.setState({ isShowingModal: true });
    }
  };

  ImageModal.prototype.handleClick = function handleClick() {
    this.setState({ isShowingModal: true });
  };

  ImageModal.prototype.handleClose = function handleClose() {
    this.setState({ isShowingModal: false });
  };

  ImageModal.prototype.render = function render() {
    var _props = this.props,
        params = _props.match.params,
        _props$location = _props.location,
        pathname = _props$location.pathname,
        state = _props$location.state;

    console.log("params" + JSON.stringify(params));
    var isShowingModal = this.state.isShowingModal;
    var usersHash = params.usersHash,
        orderId = params.orderId,
        fileName = params.fileName;
    // if(fileName.length < 10) return null

    var originalUrl = state ? state.originalUrl : "/order/" + usersHash + "/" + orderId;
    var albumId = state ? state.albumId : undefined;
    if (!state) return null; // TODO: WTH

    return isShowingModal ? _react2.default.createElement(_image_modal_tile2.default, {
      onClick: this.handleClick,
      onClose: this.handleClose,
      isShowing: isShowingModal,
      params: params,
      state: state,
      originalUrl: originalUrl,
      albumId: albumId,
      imageId: fileName
    }) : _react2.default.createElement(_Redirect2.default, { to: {
        pathname: originalUrl,
        query: { album: albumId }
      } });
  };

  return ImageModal;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ImageModal);