"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _album_list = require("../../components/confirm/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reinsert = function reinsert(albumList, from, to) {
  var albumListNew = albumList.slice(0);
  var srcAlbum = albumListNew[from];
  var tempPriority = srcAlbum.priority;

  srcAlbum.priority = albumListNew[to].priority;
  albumListNew[to].priority = tempPriority;
  albumListNew.splice(from, 1);
  albumListNew.splice(to, 0, srcAlbum);

  return albumListNew;
};

// To check if list item is in range
var clamp = function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
};

var AlbumListConfiguration = function (_Component) {
  _inherits(AlbumListConfiguration, _Component);

  function AlbumListConfiguration() {
    _classCallCheck(this, AlbumListConfiguration);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.itemHeight = 50;
    _this.itemSpacing = 10;

    _this.state = {
      delta: 0, // Used to calculate height wrt to current contaier (postion of list item - position of list container)
      mouse: 0, // Stores height wrt container
      isPressed: false,
      lastPressed: 0,
      lastPressedIndex: 0,
      prior: 174
    };

    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    return _this;
  }

  AlbumListConfiguration.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  AlbumListConfiguration.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  AlbumListConfiguration.prototype.handleMouseDown = function handleMouseDown(pos, pressY, e) {
    var button = e.button;
    var pageY = e.pageY;
    var imageList = this.props.imageList;

    if (e.button === 0) {
      this.setState({
        delta: pageY,
        mouse: pressY,
        isPressed: true,
        lastPressed: pos,
        lastPressedIndex: imageList.indexOf(pos)
      });
    }
  };

  AlbumListConfiguration.prototype.handleMouseMove = function handleMouseMove(_ref) {
    var pageY = _ref.pageY;
    var _props = this.props;
    var imageList = _props.imageList;
    var setImageList = _props.setImageList;
    var _state = this.state;
    var isPressed = _state.isPressed;
    var delta = _state.delta;
    var lastPressed = _state.lastPressed;
    var lastPressedIndex = _state.lastPressedIndex;


    if (isPressed) {
      var mouse = pageY - delta;
      var effectiveMouse = mouse + lastPressedIndex * this.itemHeight;
      var row = clamp(Math.round(effectiveMouse / (this.itemHeight + this.itemSpacing)), 0, imageList.length - 1);
      var indexLastPressed = imageList.indexOf(lastPressed);

      if (row !== indexLastPressed) {
        var newImageList = reinsert(imageList, indexLastPressed, row);
        setImageList(newImageList);
      }

      this.setState({ mouse: mouse });
    }
  };

  AlbumListConfiguration.prototype.handleMouseUp = function handleMouseUp() {
    this.setState({ isPressed: false, delta: 0 });
  };

  AlbumListConfiguration.prototype.render = function render() {
    var _state2 = this.state;
    var mouse = _state2.mouse;
    var isPressed = _state2.isPressed;
    var lastPressed = _state2.lastPressed;
    var lastPressedIndex = _state2.lastPressedIndex;
    var imageList = this.props.imageList;


    return _react2.default.createElement(_album_list2.default, {
      albumList: imageList,
      mouse: mouse,
      isPressed: isPressed,
      lastPressed: lastPressed,
      handleMouseDown: this.handleMouseDown,
      lastPressedIndex: lastPressedIndex,
      itemHeight: this.itemHeight,
      itemSpacing: this.itemSpacing
    });
  };

  return AlbumListConfiguration;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  return {
    imageList: store.imageList || []
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setImageList: function setImageList(list) {
      dispatch((0, _actions.populateImageList)(list));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AlbumListConfiguration);
//# sourceMappingURL=album_list.js.map