"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactMotion = require("react-motion");

var _album = require("../../components/order_page/album");

var _album2 = _interopRequireDefault(_album);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlbumItem = function (_Component) {
  _inherits(AlbumItem, _Component);

  function AlbumItem() {
    _classCallCheck(this, AlbumItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      expanded: false
    };

    _this.handleExpand = _this.handleExpand.bind(_this);
    _this.getDefaultStyles = _this.getDefaultStyles.bind(_this);
    _this.getStyles = _this.getStyles.bind(_this);
    return _this;
  }

  AlbumItem.prototype.handleExpand = function handleExpand() {
    this.setState({ expanded: !this.state.expanded });
  };

  // actual animation-related logic


  AlbumItem.prototype.getDefaultStyles = function getDefaultStyles() {
    var files = this.props.files;

    return files.map(function (file) {
      return { data: file, key: file.name, style: { height: 0, opacity: 1 } };
    });
  };

  AlbumItem.prototype.getStyles = function getStyles() {
    var files = this.props.files;


    return files.map(function (file, i) {
      return {
        data: file,
        key: file.name.toString(),
        style: {
          height: (0, _reactMotion.spring)(30, _reactMotion.presets.gentle),
          opacity: (0, _reactMotion.spring)(1, _reactMotion.presets.gentle)
        }
      };
    });
  };

  AlbumItem.prototype.willEnter = function willEnter() {
    return {
      height: 0,
      opacity: 1
    };
  };

  AlbumItem.prototype.willLeave = function willLeave() {
    return {
      height: (0, _reactMotion.spring)(0),
      opacity: (0, _reactMotion.spring)(0)
    };
  };

  AlbumItem.prototype.render = function render() {
    var album = this.props.album;

    return _react2.default.createElement(_album2.default, {
      album: album,
      expanded: this.state.expanded,
      handleExpand: this.handleExpand,
      willEnter: this.willEnter,
      willLeave: this.willLeave,
      getStyles: this.getStyles,
      getDefaultStyles: this.getDefaultStyles
    });
  };

  return AlbumItem;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var albumId = ownProps.album.id;
  var files = store.albums[albumId].files;

  return {
    files: files
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AlbumItem);
//# sourceMappingURL=album.js.map