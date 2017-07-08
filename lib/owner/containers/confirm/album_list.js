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
    var button = e.button,
        pageY = e.pageY;
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
    var _props = this.props,
        imageList = _props.imageList,
        setImageList = _props.setImageList;
    var _state = this.state,
        isPressed = _state.isPressed,
        delta = _state.delta,
        lastPressed = _state.lastPressed,
        lastPressedIndex = _state.lastPressedIndex;


    if (isPressed) {
      var mouse = pageY - delta;
      var effectiveMousePosition = mouse + lastPressedIndex * this.itemHeight;
      var possibleRow = Math.round(effectiveMousePosition / (this.itemHeight + this.itemSpacing));
      var row = clamp(possibleRow, 0, imageList.length - 1);
      var indexLastPressed = imageList.indexOf(lastPressed);

      this.swapAlbumPriority(indexLastPressed, row);
      this.setState({ mouse: mouse });
    }
  };

  AlbumListConfiguration.prototype.handleMouseUp = function handleMouseUp() {
    this.setState({ isPressed: false, delta: 0 });
  };

  AlbumListConfiguration.prototype.swapAlbumPriority = function swapAlbumPriority(src, target) {
    var _mapping;

    if (src === target) return;

    var _props2 = this.props,
        imageList = _props2.imageList,
        swapAlbumInStore = _props2.swapAlbumInStore,
        order_id = _props2.order_id;

    var srcAlbum = imageList[src];
    var destAlbum = imageList[target];

    var updateJson = {
      order_id: order_id,
      mapping: (_mapping = {}, _mapping[srcAlbum.id] = destAlbum.priority, _mapping[destAlbum.id] = srcAlbum.priority, _mapping)
    };

    swapAlbumInStore(src, target);
    (0, _actions.updateAlbum)(updateJson, function (_ref2) {
      var res = _ref2.res;
      return console.log(res.count);
    });
  };

  AlbumListConfiguration.prototype.render = function render() {
    var _state2 = this.state,
        mouse = _state2.mouse,
        isPressed = _state2.isPressed,
        lastPressed = _state2.lastPressed,
        lastPressedIndex = _state2.lastPressedIndex;
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
    order_id: store.order.id,
    imageList: store.imageList || []
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setImageList: function setImageList(list) {
      dispatch((0, _actions.populateImageList)(list));
    },

    swapAlbumInStore: function swapAlbumInStore(source, destination) {
      dispatch((0, _actions.swapAlbum)(source, destination));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AlbumListConfiguration);