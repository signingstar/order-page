"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 112;
var HEIGHT = 87;

var CanvasItem = function (_Component) {
  _inherits(CanvasItem, _Component);

  function CanvasItem() {
    _classCallCheck(this, CanvasItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      height: 0,
      width: 0
    };
    return _this;
  }

  CanvasItem.prototype.componentDidMount = function componentDidMount() {
    var image = this.props.image;

    if (image.preview) {
      var Reader = new FileReader();
      var context = this.canvasNode.getContext('2d');

      Reader.onload = this.loadCanvas.bind(this, context);
      Reader.readAsDataURL(image);
    }
  };

  CanvasItem.prototype.loadCanvas = function loadCanvas(context, e) {
    var img = new Image();
    img.onload = function () {
      var imageHeight = img.height;
      var imageWidth = img.width;
      var landscape = imageWidth >= imageHeight * (WIDTH / HEIGHT);

      var width = landscape ? imageHeight * (WIDTH / HEIGHT) : imageWidth;
      var height = landscape ? imageHeight : imageWidth * (HEIGHT / WIDTH);

      var widthOffset = (imageWidth - width) / 2;
      var heightOffset = (imageHeight - height) / 2;

      context.drawImage(img, widthOffset, heightOffset, width, height, 0, 0, WIDTH, HEIGHT);
    };

    img.src = e.target.result;
  };

  CanvasItem.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var image = _props.image;
    var onRemove = _props.onRemove;


    return image.preview ? _react2.default.createElement(
      "div",
      { className: "thumbnail-view" },
      _react2.default.createElement("canvas", {
        ref: function ref(node) {
          _this2.canvasNode = node;
        },
        height: HEIGHT,
        width: WIDTH
      }),
      _react2.default.createElement(
        "div",
        { className: "image-name" },
        image.name
      ),
      _react2.default.createElement(
        "div",
        { className: "image-action", onClick: function onClick(e) {
            return onRemove(e, image);
          } },
        String.fromCharCode(0x2013)
      )
    ) : _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "image-name" },
        image.name
      ),
      _react2.default.createElement(
        "div",
        { className: "image-action", onClick: function onClick(e) {
            return onRemove(e, image);
          } },
        String.fromCharCode(0x2013)
      )
    );
  };

  return CanvasItem;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onRemove: function onRemove(e, name) {
      ownProps.onRemove(e, name);
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CanvasItem);
//# sourceMappingURL=canvas.js.map