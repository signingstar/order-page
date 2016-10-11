"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

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

    _this.state = {};
    return _this;
  }

  ImageModalTileConfiguration.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props;
    var state = _props.state;
    var images = _props.images;
    var fileName = _props.params.fileName;


    if (state) {
      this.setState({ index: state.index });
    } else {
      var elemIndex = images.findIndex(function (entry) {
        return entry.filename === fileName;
      });
      this.setState({ index: elemIndex });
    }
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

  ImageModalTileConfiguration.prototype.render = function render() {
    var _props2 = this.props;
    var onClose = _props2.onClose;
    var isShowing = _props2.isShowing;
    var images = _props2.images;
    var pathname = _props2.pathname;
    var params = _props2.params;
    var state = _props2.state;
    var des = _props2.des;
    var index = this.state.index;

    var image = Object.assign({}, images[index], { index: index });

    return _react2.default.createElement(_image_modal_tile2.default, {
      showNext: this.increment,
      showPrevious: this.decrement,
      onClose: onClose,
      isShowing: isShowing,
      image: image
    });
  };

  return ImageModalTileConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var images = store.images;


  return {
    images: images
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageModalTileConfiguration);
//# sourceMappingURL=image_modal_tile.js.map