"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var customerDetails = function customerDetails() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var _ref$params = _ref.params;
  var params = _ref$params === undefined ? [] : _ref$params;

  switch (type) {
    case _actions.UPDATE_CUSTOMER_DETAILS:
      return Object.assign({}, state, params, { dirty: true });
    default:
      return state;
  }
};

exports.default = customerDetails;
//# sourceMappingURL=order.js.map