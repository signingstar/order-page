"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var order = function order() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var params = _ref.params;

  switch (type) {
    case _actions.UPDATE_ORDER:
      return Object.assign({}, state, params.orderData);

    case _actions.SET_FILES:
      return Object.assign({}, state, {
        files: params
      });

    case _actions.SET_ORDER_NAME:
      return Object.assign({}, state, { name: params });

    default:
      return state;
  }
};

exports.default = order;
//# sourceMappingURL=order.js.map