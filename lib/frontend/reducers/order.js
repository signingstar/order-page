"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var order = function order() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { customer: {} };
  var _ref = arguments[1];
  var type = _ref.type,
      params = _ref.params;

  switch (type) {
    case _actions.UPDATE_ORDER:
      var customer = Object.assign({}, state.customer);
      customer.dirty = false;
      return Object.assign({}, state, params.orderData, { customer: customer });

    case _actions.SET_FILES:
      return Object.assign({}, state, {
        files: params
      });

    case _actions.SET_ORDER_PARAM:
      return Object.assign({}, state, params);

    case _actions.SET_PRODUCT:
      return Object.assign({}, state, { product: params });

    case _actions.RESET_PRODUCT:
      return Object.assign({}, state, { product: {} });

    case _actions.UPDATE_CUSTOMER_DETAILS:
      var key = params.key,
          value = params.value;

      var newCustomer = Object.assign({}, state.customer);
      newCustomer[key] = value;
      newCustomer.dirty = true;
      return Object.assign({}, state, { customer: newCustomer });

    default:
      return state;
  }
};

exports.default = order;
//# sourceMappingURL=order.js.map