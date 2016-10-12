"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _Link = require("react-router/Link");

var _Link2 = _interopRequireDefault(_Link);

var _Match = require("react-router/Match");

var _Match2 = _interopRequireDefault(_Match);

var _image_arrangement = require("./image_arrangement");

var _image_arrangement2 = _interopRequireDefault(_image_arrangement);

var _add_user = require("./add_user");

var _add_user2 = _interopRequireDefault(_add_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, _Component.call(this));
  }

  Home.prototype.componentDidMount = function componentDidMount() {
    var users = this.props.users;
  };

  Home.prototype.render = function render() {
    var _props = this.props;
    var order = _props.order;
    var images = _props.images;
    var pathname = _props.pathname;
    var pattern = _props.pattern;
    var params = _props.params;
    var usersHash = params.usersHash;
    var orderId = params.orderId;

    var homePage = pattern !== '/order/:usersHash/:orderId/:fileName';

    if (!homePage) return null;

    return _react2.default.createElement(
      "div",
      { className: "panels" },
      _react2.default.createElement(
        "div",
        { className: "left-panel" },
        _react2.default.createElement(
          "div",
          null,
          order.productLabel
        ),
        _react2.default.createElement(
          "div",
          null,
          "Photographer: ",
          order.photographer
        ),
        _react2.default.createElement(
          "div",
          null,
          "Status: ",
          order.orderstatus
        ),
        _react2.default.createElement(
          _Link2.default,
          { to: "/order/" + usersHash + "/" + orderId + "/addUser" },
          "Add User"
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "right-panel" },
        _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId", component: _image_arrangement2.default }),
        _react2.default.createElement(_Match2.default, { exactly: true, pattern: "/order/:usersHash/:orderId/addUser", component: _add_user2.default })
      )
    );
  };

  return Home;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    order: store.order,
    users: store.users
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);
//# sourceMappingURL=home.js.map