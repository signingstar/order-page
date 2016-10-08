"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var images = function images() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var _ref$params = _ref.params;
  var params = _ref$params === undefined ? [] : _ref$params;

  var newState = void 0;
  switch (type) {
    case _actions.SET_IMAGES:
      newState = state.slice();
      params.map(function (image) {
        return newState.push(image);
      });
      return newState;
    case _actions.REMOVE_IMAGE:
      newState = state.slice();
      newState.push(params);
      return newState;
    default:
      return state;
  }
};

exports.default = images;
//# sourceMappingURL=images.js.map