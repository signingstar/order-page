"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../actions/index");

var categoryState = function categoryState() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var category = _ref.category;
  var subCategory = _ref.subCategory;

  switch (type) {
    case _index.SET_CATEGORY:
      return Object.assign({}, state, {
        category: category
      });
      break;
    case _index.SET_SUB_CATEGORY:
      return Object.assign({}, state, {
        subCategory: subCategory
      });
      break;
    case _index.SET_ALL_CATEGORY:
      return Object.assign({}, state, {
        category: category,
        subCategory: subCategory
      });
      break;
    default:
      return state;
  }
};

exports.default = categoryState;