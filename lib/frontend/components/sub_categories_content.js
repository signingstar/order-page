"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _sub_categories = require("../print_types/stationary/sub_categories");

var _sub_categories2 = _interopRequireDefault(_sub_categories);

var _sub_categories3 = require("../print_types/visiting_card/sub_categories");

var _sub_categories4 = _interopRequireDefault(_sub_categories3);

var _sub_categories5 = require("../print_types/flyers/sub_categories");

var _sub_categories6 = _interopRequireDefault(_sub_categories5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubCategoriesContent = function SubCategoriesContent(_ref) {
  var label = _ref.label;
  var type = _ref.type;

  var placeholder = 'Select Item';
  var modalContent = void 0;

  if (type === 'visiting_card') {
    modalContent = _react2.default.createElement(_sub_categories4.default, { label: label });
  } else if (type === 'stationary') {
    modalContent = _react2.default.createElement(_sub_categories2.default, { label: label });
  } else if (type === 'flyers') {
    modalContent = _react2.default.createElement(_sub_categories6.default, { label: label });
  }

  return _react2.default.createElement(
    "div",
    { className: "category-modal" },
    modalContent
  );
};

exports.default = SubCategoriesContent;