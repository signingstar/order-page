"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _image_tile = require("../components/image_tile/image_tile");

var _image_tile2 = _interopRequireDefault(_image_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageTileConfiguration = function (_Component) {
  _inherits(ImageTileConfiguration, _Component);

  function ImageTileConfiguration() {
    _classCallCheck(this, ImageTileConfiguration);

    return _possibleConstructorReturn(this, _Component.call(this));
  }

  ImageTileConfiguration.prototype.render = function render() {
    var _props = this.props,
        image = _props.image,
        pathname = _props.pathname,
        albumId = _props.albumId;

    return _react2.default.createElement(_image_tile2.default, {
      image: image,
      pathname: pathname,
      albumId: albumId
    });
  };

  return ImageTileConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var images = store.images,
      albums = store.albums;
  var index = ownProps.index,
      id = ownProps.id,
      albumId = ownProps.albumId;


  var image = Object.assign({}, images[id], { index: index, id: id });

  return {
    image: image
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageTileConfiguration);