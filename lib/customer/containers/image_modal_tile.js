"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _image_modal_tile = require("../components/modal/image_modal_tile");

var _image_modal_tile2 = _interopRequireDefault(_image_modal_tile);

var _nav_links = require("../components/modal/nav_links");

var _nav_links2 = _interopRequireDefault(_nav_links);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageModalTileConfiguration = function (_Component) {
  _inherits(ImageModalTileConfiguration, _Component);

  function ImageModalTileConfiguration() {
    _classCallCheck(this, ImageModalTileConfiguration);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.increment = _this.increment.bind(_this);
    _this.decrement = _this.decrement.bind(_this);
    _this.showFullScreen = _this.showFullScreen.bind(_this);

    _this.state = {
      showFull: false
    };
    return _this;
  }

  ImageModalTileConfiguration.prototype.componentWillMount = function componentWillMount() {
    this.updateLocalState(this.props);
  };

  ImageModalTileConfiguration.prototype.updateLocalState = function updateLocalState(props) {
    var state = props.state;


    if (state) {
      this.setState({ index: state.index });
    }
  };

  ImageModalTileConfiguration.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.updateLocalState(nextProps);
  };

  ImageModalTileConfiguration.prototype.increment = function increment() {
    var imageIdList = this.props.imageIdList;

    var lastElementIndex = imageIdList.length - 1;

    if (typeof this.state.index !== 'undefined' && this.state.index < lastElementIndex) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  ImageModalTileConfiguration.prototype.decrement = function decrement() {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
  };

  ImageModalTileConfiguration.prototype.getNavLink = function getNavLink(index, originalUrl, albumId, right) {
    var imageIdList = this.props.imageIdList;


    if (typeof index === 'undefined' || right && index >= imageIdList.length - 1 || !right && index <= 0) {
      return;
    }

    var nextImage = imageIdList[right ? index + 1 : index - 1];

    return _react2.default.createElement(_nav_links2.default, {
      originalUrl: originalUrl,
      imageId: nextImage,
      albumId: albumId,
      index: index,
      next: right
    });
  };

  ImageModalTileConfiguration.prototype.showFullScreen = function showFullScreen() {
    this.setState({ showFull: !this.state.showFull });
  };

  ImageModalTileConfiguration.prototype.render = function render() {
    var _props = this.props,
        onClose = _props.onClose,
        isShowing = _props.isShowing,
        images = _props.images,
        pathname = _props.pathname,
        state = _props.state,
        originalUrl = _props.originalUrl,
        albumId = _props.albumId,
        imageIdList = _props.imageIdList,
        imageId = _props.imageId;
    var index = this.state.index;

    var image = index > -1 ? Object.assign({}, images[imageIdList[index]], { index: index }) : images[imageId];

    var previousLink = this.getNavLink(index, originalUrl, albumId, false);
    var nextLink = this.getNavLink(index, originalUrl, albumId, true);

    return _react2.default.createElement(_image_modal_tile2.default, {
      showNext: this.increment,
      showPrevious: this.decrement,
      onClose: onClose,
      isShowing: isShowing,
      image: image,
      previousLink: previousLink,
      nextLink: nextLink,
      showFullScreen: this.showFullScreen,
      fullScreen: this.state.showFull
    });
  };

  return ImageModalTileConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var images = store.images,
      albums = store.albums;
  var albumId = ownProps.albumId;


  var imageIdList = [];
  if (albumId) {
    imageIdList = albums[albumId].files;
  } else {
    for (var album in albums) {
      imageIdList = imageIdList.concat(albums[album].files);
    }
  }

  return {
    images: images,
    imageIdList: imageIdList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageModalTileConfiguration);