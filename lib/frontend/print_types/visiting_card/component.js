"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _category_heading = require("../../components/category_heading");

var _category_heading2 = _interopRequireDefault(_category_heading);

var _dropdown = require("../../containers/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _text_input = require("../../containers/text_input");

var _text_input2 = _interopRequireDefault(_text_input);

var _checkbox = require("../../containers/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _design_files = require("../../containers/design_files");

var _design_files2 = _interopRequireDefault(_design_files);

var _main = require("../../../confirmation/containers/main");

var _main2 = _interopRequireDefault(_main);

var _index = require("../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisitingCard = function VisitingCard(_ref) {
  var coatList = _ref.coatList;
  var paperQualityList = _ref.paperQualityList;
  var quantityList = _ref.quantityList;
  var fieldsLabel = _ref.fieldsLabel;

  return _react2.default.createElement(
    "div",
    { className: "main-section-body" },
    _react2.default.createElement(
      "div",
      { className: "left-panel" },
      _react2.default.createElement(_category_heading2.default, { category: fieldsLabel.category }),
      _react2.default.createElement(_dropdown2.default, {
        itemList: paperQualityList,
        category: _index.PAPER_QUALITY,
        onSelect: _index.setPaperQuality
      }),
      _react2.default.createElement(_dropdown2.default, {
        itemList: coatList,
        category: _index.COATING,
        onSelect: _index.setCoating
      }),
      _react2.default.createElement(_text_input2.default, {
        onUpdate: _index.setQuantity,
        category: _index.QUANTITY
      }),
      _react2.default.createElement(_design_files2.default, null),
      _react2.default.createElement(_checkbox2.default, {
        onUpdate: _index.setTemplate,
        category: _index.TEMPLATE
      })
    ),
    _react2.default.createElement(
      "div",
      { className: "right-panel" },
      _react2.default.createElement(_main2.default, { fieldsLabel: fieldsLabel })
    )
  );
};

exports.default = VisitingCard;