"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var product = function product() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var _ref$params = _ref.params;
  var params = _ref$params === undefined ? {} : _ref$params;

  switch (type) {
    case _actions.SET_PRODUCT:
      return params;
    case _actions.RESET_PRODUCT:
      return {};
    default:
      return state;
  }
};

exports.default = product;
//# sourceMappingURL=product.js.map