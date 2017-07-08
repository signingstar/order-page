"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _add_user = require("../../components/users/add_user");

var _add_user2 = _interopRequireDefault(_add_user);

var _user_list = require("./user_list");

var _user_list2 = _interopRequireDefault(_user_list);

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddUserHandler = function (_Component) {
  _inherits(AddUserHandler, _Component);

  function AddUserHandler() {
    _classCallCheck(this, AddUserHandler);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.selectRole = _this.selectRole.bind(_this);

    _this.state = { role: 3 };
    return _this;
  }

  AddUserHandler.prototype.selectRole = function selectRole(e) {
    this.setState({ role: e.value });
  };

  AddUserHandler.prototype.onSubmit = function onSubmit(e, input) {
    var _props = this.props,
        onAdd = _props.onAdd,
        order_id = _props.order_id;

    var role = this.state.role || 3;

    e.preventDefault();

    var emailid = input.value;
    if (!emailid.trim()) {
      return;
    }

    emailid = emailid.trim();

    (0, _actions.addUser)({ emailid: emailid, role: role, order_id: order_id }, function () {
      return onAdd(emailid, role);
    });
    input.value = '';
  };

  AddUserHandler.prototype.render = function render() {
    var _props2 = this.props,
        image = _props2.image,
        pathname = _props2.pathname,
        params = _props2.params,
        role = _props2.role;


    var roleNodes = [];

    for (var i in _actions.USER_ROLES) {
      roleNodes.push({ value: +i, label: _actions.USER_ROLES[i].description });
    }

    return role === 5 ? _react2.default.createElement(
      "div",
      { className: "add-users extra-margin" },
      _react2.default.createElement(_add_user2.default, {
        image: image,
        pathname: pathname,
        onSubmit: this.onSubmit,
        roleNodes: roleNodes,
        onSelect: this.selectRole,
        role: this.state.role
      }),
      _react2.default.createElement(_user_list2.default, null)
    ) : null;
  };

  return AddUserHandler;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var images = store.images;
  var index = ownProps.index,
      id = ownProps.id;

  var image = Object.assign({}, images[index], { index: index });

  return {
    image: image,
    order_id: store.order.id,
    role: store.order.role
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onAdd: function onAdd(email, role) {
      dispatch((0, _actions.addUserToStore)(email, role));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddUserHandler);