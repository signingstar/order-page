"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var errorState = function errorState() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var _ref$details = _ref.details;
  var details = _ref$details === undefined ? {} : _ref$details;

  switch (type) {
    case _actions.CLEAR_ALL_ERRORS:
      return {};
    case _actions.CLEAR_ERROR:
      var message = Object.assign({}, state.message);
      delete message[details];
      return Object.assign({}, state, { message: message });
    case _actions.SET_SUCCESS:
    case _actions.SET_ERROR:
      return Object.assign({}, state, { message: details });
    default:
      return state;
  }
};

exports.default = errorState;
//# sourceMappingURL=error.js.map