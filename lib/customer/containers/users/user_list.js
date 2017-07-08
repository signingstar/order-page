"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _user = require("../../components/users/user");

var _user2 = _interopRequireDefault(_user);

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersDecorator = function (_Component) {
  _inherits(UsersDecorator, _Component);

  function UsersDecorator() {
    _classCallCheck(this, UsersDecorator);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.onDeleteUser = _this.onDeleteUser.bind(_this);
    return _this;
  }

  UsersDecorator.prototype.onDeleteUser = function onDeleteUser(emailid) {
    var _props = this.props,
        onDelete = _props.onDelete,
        order_id = _props.order_id;


    (0, _actions.deleteUser)({ emailid: emailid, order_id: order_id }, function () {
      return onDelete(emailid);
    });
  };

  UsersDecorator.prototype.render = function render() {
    var _this2 = this;

    var user_list = this.props.user_list;


    var users = user_list.map(function (user) {
      return _react2.default.createElement(_user2.default, _extends({
        key: user.email,
        onDelete: function onDelete() {
          return _this2.onDeleteUser(user.email);
        }
      }, user));
    });

    return _react2.default.createElement(
      "div",
      null,
      users
    );
  };

  return UsersDecorator;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  return {
    user_list: store.users || [],
    order_id: store.order.id
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onDelete: function onDelete(email) {
      dispatch((0, _actions.deleteUserFromStore)(email));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UsersDecorator);