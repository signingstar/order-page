"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddUser = function AddUser(_ref) {
  var _onSubmit = _ref.onSubmit;
  var onSelect = _ref.onSelect;
  var role = _ref.role;
  var roleNodes = _ref.roleNodes;

  var emailid = void 0;

  return _react2.default.createElement(
    "form",
    { onSubmit: function onSubmit(e) {
        return _onSubmit(e, emailid);
      } },
    _react2.default.createElement(
      "div",
      { className: "fields" },
      _react2.default.createElement(
        "div",
        { className: "field" },
        _react2.default.createElement("input", { type: "email",
          className: "medium-field",
          placeholder: "Email Id",
          ref: function ref(node) {
            emailid = node;
          },
          autoFocus: true
        })
      ),
      _react2.default.createElement(_reactSelect2.default, {
        name: "category",
        options: roleNodes,
        onChange: onSelect,
        className: "role",
        value: role,
        searchable: false,
        clearable: false
      }),
      _react2.default.createElement(
        "div",
        { className: "submit-button" },
        _react2.default.createElement(
          "button",
          { type: "submit" },
          " Add "
        )
      )
    )
  );
};

exports.default = AddUser;
//# sourceMappingURL=add_user.js.map