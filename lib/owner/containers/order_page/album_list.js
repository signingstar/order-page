"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _album_list = require("../../components/order_page/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlbumListConfiguration = function (_Component) {
  _inherits(AlbumListConfiguration, _Component);

  function AlbumListConfiguration() {
    _classCallCheck(this, AlbumListConfiguration);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.itemHeight = 50;
    _this.itemSpacing = 10;
    return _this;
  }

  AlbumListConfiguration.prototype.render = function render() {
    var imageList = this.props.imageList;


    return _react2.default.createElement(_album_list2.default, {
      albumList: imageList,
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
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AlbumListConfiguration);