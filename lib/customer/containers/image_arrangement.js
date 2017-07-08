"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _image_tiles = require("../components/image_tile/image_tiles");

var _image_tiles2 = _interopRequireDefault(_image_tiles);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageConfiguration = function (_Component) {
  _inherits(ImageConfiguration, _Component);

  function ImageConfiguration() {
    _classCallCheck(this, ImageConfiguration);

    return _possibleConstructorReturn(this, _Component.call(this));
  }

  ImageConfiguration.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        onMergeReactions = _props.onMergeReactions,
        order_id = _props.order_id,
        mergeStatus = _props.mergeStatus;


    if (mergeStatus) {
      return;
    }

    // getImageFeedback({order_id}, ({res, err}) => {
    //   if(!err) {
    //     return onMergeReactions(res)
    //   }
    // })
  };

  ImageConfiguration.prototype.render = function render() {
    var _props2 = this.props,
        pathname = _props2.pathname,
        albums = _props2.albums,
        query = _props2.location.query;

    var album_id = query && query.album ? query.album : undefined;
    var imageList = [];

    if (album_id) {
      imageList = albums[album_id].files;
    } else {
      for (var album in albums) {
        imageList = imageList.concat(albums[album].files);
      }
    }

    return _react2.default.createElement(_image_tiles2.default, {
      images: imageList,
      pathname: pathname,
      albumId: album_id
    });
  };

  return ImageConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images,
      order = store.order,
      albums = store.albums;


  return {
    albums: albums,
    order_id: order.id,
    mergeStatus: order.merged
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onMergeReactions: function onMergeReactions(obj) {
      dispatch((0, _actions.mergeReactions)(obj));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageConfiguration);