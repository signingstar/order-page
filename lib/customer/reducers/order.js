"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var customerDetails = function customerDetails() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      _ref$params = _ref.params,
      params = _ref$params === undefined ? [] : _ref$params;

  switch (type) {
    case _actions.UPDATE_CUSTOMER_DETAILS:
      return Object.assign({}, state, params, { dirty: true });

    case _actions.MERGE_REACTIONS:
      return Object.assign({}, state, params, { merged: true });

    default:
      return state;
  }
};

exports.default = customerDetails;