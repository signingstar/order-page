"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _image_modal_tile = require("../components/image_modal_tile");

var _image_modal_tile2 = _interopRequireDefault(_image_modal_tile);

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
    var state = props.state,
        images = props.images,
        fileName = props.params.fileName;


    if (state) {
      this.setState({ index: state.index });
    } else {
      var elemIndex = images.findIndex(function (entry) {
        return entry.filename === fileName;
      });
      this.setState({ index: elemIndex });
    }
  };

  ImageModalTileConfiguration.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.updateLocalState(nextProps);
  };

  ImageModalTileConfiguration.prototype.increment = function increment() {
    var images = this.props.images;

    var lastElementIndex = images.length - 1;

    if (this.state.index < lastElementIndex) {
      this.setState({ index: this.state.index + 1 });
    }
  };

  ImageModalTileConfiguration.prototype.decrement = function decrement() {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
    }
  };

  ImageModalTileConfiguration.prototype.getNextLink = function getNextLink(index, originalUrl, albumId) {
    var images = this.props.images;

    var image = images[index + 1];

    return _react2.default.createElement(
      _Link2.default,
      { to: {
          pathname: originalUrl + "/" + image.id,
          state: { originalUrl: originalUrl, fromModal: true, index: index + 1, albumId: albumId }
        },
        className: "image-nav-item"
      },
      _react2.default.createElement("span", { className: "glyphicon glyphicon-menu-right icon" })
    );
  };

  ImageModalTileConfiguration.prototype.getPreviousLink = function getPreviousLink(index, originalUrl, albumId) {
    var images = this.props.images;

    var image = images[index - 1];

    return _react2.default.createElement(
      _Link2.default,
      { to: {
          pathname: originalUrl + "/" + image.id,
          state: { originalUrl: originalUrl, fromModal: true, index: index - 1, albumId: albumId }
        },
        className: "image-nav-item"
      },
      _react2.default.createElement("span", { className: "glyphicon glyphicon-menu-left icon" })
    );
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
        params = _props.params,
        state = _props.state,
        originalUrl = _props.originalUrl,
        albumId = _props.albumId;
    var index = this.state.index;

    var image = Object.assign({}, images[index], { index: index });

    var previousLink = index > 0 ? this.getPreviousLink(index, originalUrl, albumId) : undefined;
    var nextLink = index < images.length - 1 ? this.getNextLink(index, originalUrl, albumId) : undefined;

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
  var images = store.images;
  var albumId = ownProps.albumId;


  var imageList = [];
  if (albumId) {
    imageList = images[albumId].files;
  } else {
    for (var album in images) {
      imageList = imageList.concat(images[album].files);
    }
  }

  return {
    images: imageList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageModalTileConfiguration);
//# sourceMappingURL=image_modal_tile.js.map