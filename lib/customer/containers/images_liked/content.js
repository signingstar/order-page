"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _content = require("../../components/images_liked/content");

var _content2 = _interopRequireDefault(_content);

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupLikedImages = function (_Component) {
  _inherits(GroupLikedImages, _Component);

  function GroupLikedImages() {
    _classCallCheck(this, GroupLikedImages);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.filterImages = _this.filterImages.bind(_this);
    _this.state = {
      images: []
    };
    return _this;
  }

  GroupLikedImages.prototype.componentWillMount = function componentWillMount() {
    this.setState({ images: this.filterImages(this.props.filter) });
  };

  GroupLikedImages.prototype.filterImages = function filterImages(filter) {
    var _props = this.props,
        imageSet = _props.imageSet,
        files = _props.files;


    if (filter === _actions.ALL) {
      return files.map(function (file) {
        return Object.assign({}, imageSet[file], { id: file });
      });
    }

    return files.filter(function (file) {
      return imageSet[file][_actions.LIKES] === filter;
    }).map(function (file) {
      return Object.assign({}, imageSet[file], { id: file });
    });
  };

  GroupLikedImages.prototype.filterImagesByPerson = function filterImagesByPerson(filter, user) {
    if (!user) return this.filterImages(filter);

    var _props2 = this.props,
        imageSet = _props2.imageSet,
        files = _props2.files;


    if (filter === _actions.ALL) {
      return files.map(function (file) {
        return Object.assign({}, imageSet[file], { id: file });
      });
    }

    return files.filter(function (file) {
      return imageSet[file][_actions.LIKED] && imageSet[file][_actions.LIKED].reaction_type === filter && imageSet[file][_actions.LIKED].name === user;
    }).map(function (file) {
      return Object.assign({}, imageSet[file], { id: file });
    });
  };

  GroupLikedImages.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({ images: this.filterImages(nextProps.filter) });
  };

  GroupLikedImages.prototype.render = function render() {
    var previewMode = this.props.previewMode;


    return _react2.default.createElement(_content2.default, { images: this.state.images, pathname: this.props.pathname, previewMode: previewMode });
  };

  return GroupLikedImages;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images,
      albums = store.albums;

  var files = [];

  for (var album in albums) {
    files = files.concat(albums[album].files);
  }

  return {
    imageSet: images,
    files: files
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(GroupLikedImages);