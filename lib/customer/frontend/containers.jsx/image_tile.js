"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _image_tile = require("../components/image_tile");

var _image_tile2 = _interopRequireDefault(_image_tile);

var _actions = require("../actions");

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
    var _props = this.props;
    var onLike = _props.onLike;
    var onDisike = _props.onDisike;
    var onLove = _props.onLove;
    var onComment = _props.onComment;
    var image = _props.image;
    var pathname = _props.pathname;

    return _react2.default.createElement(_image_tile2.default, {
      image: image,
      onLike: onLike,
      onDisike: onDisike,
      onLove: onLove,
      onComment: onComment,
      pathname: pathname
    });
  };

  return ImageTileConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var images = store.images;
  var index = ownProps.index;
  var id = ownProps.id;

  var image = Object.assign({}, images[index - 1], { index: index });

  return {
    image: image
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLike: function onLike(id) {
      dispatch((0, _actions.likeImage)(id));
    },

    onDisike: function onDisike(id) {
      dispatch((0, _actions.dislikeImage)(id));
    },

    onLove: function onLove(id) {
      dispatch((0, _actions.loveImage)(id));
    },

    onComment: function onComment(id, comment) {
      dispatch((0, _actions.commentOnImage)(id, comment));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageTileConfiguration);
//# sourceMappingURL=image_tile.js.map