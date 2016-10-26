"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _add_user = require("../components/add_user");

var _add_user2 = _interopRequireDefault(_add_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddUserHandler = function (_Component) {
  _inherits(AddUserHandler, _Component);

  function AddUserHandler() {
    _classCallCheck(this, AddUserHandler);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.selectRole = _this.selectRole.bind(_this);

    _this.state = { role: 3 };
    return _this;
  }

  AddUserHandler.prototype.selectRole = function selectRole(e) {
    this.setState({ role: e.value });
  };

  AddUserHandler.prototype.render = function render() {
    var _props = this.props;
    var image = _props.image;
    var pathname = _props.pathname;
    var params = _props.params;
    var role = _props.role;


    var roleNodes = [];

    var USER_ROLES = {
      5: { shortDescription: 'Admin', description: 'Admin - Full Access' },
      3: { shortDescription: 'Contributor', description: 'Contributor - Limited Access' },
      1: { shortDescription: 'Visitor', description: 'Visitor - View Access' }
    };

    for (var i in USER_ROLES) {
      roleNodes.push({ value: +i, label: USER_ROLES[i].description });
    }

    return role === 5 ? _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_add_user2.default, {
        image: image,
        pathname: pathname,
        roleNodes: roleNodes,
        onSelect: this.selectRole,
        role: this.state.role
      })
    ) : null;
  };

  return AddUserHandler;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var images = store.images;
  var index = ownProps.index;
  var id = ownProps.id;

  var image = Object.assign({}, images[index], { index: index });

  return {
    image: image,
    order_id: store.order.id,
    role: store.order.role
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AddUserHandler);
//# sourceMappingURL=add_user.js.map