"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _category_heading = require("../../components/category_heading");

var _category_heading2 = _interopRequireDefault(_category_heading);

var _design_files = require("../../containers/design_files");

var _design_files2 = _interopRequireDefault(_design_files);

var _main = require("../../../confirmation/containers/main");

var _main2 = _interopRequireDefault(_main);

var _dropdown = require("../../containers/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _index = require("../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Flyers = function Flyers(_ref) {
  var filtersList = _ref.filtersList;
  var fieldsLabel = _ref.fieldsLabel;
  var sizeList = filtersList.sizeList;
  var materialList = filtersList.materialList;
  var coatList = filtersList.coatList;
  var quantityList = filtersList.quantityList;


  return _react2.default.createElement(
    "div",
    { className: "main-section-body" },
    _react2.default.createElement(
      "div",
      { className: "left-panel" },
      _react2.default.createElement(_category_heading2.default, { category: fieldsLabel.category }),
      _react2.default.createElement(_dropdown2.default, {
        itemList: sizeList,
        category: _index.SIZE,
        onSelect: _index.setSize }),
      _react2.default.createElement(_dropdown2.default, {
        itemList: materialList,
        category: _index.SURFACE,
        onSelect: _index.setSurface }),
      _react2.default.createElement(_dropdown2.default, {
        itemList: coatList,
        category: _index.COATING,
        onSelect: _index.setCoating }),
      _react2.default.createElement(_dropdown2.default, {
        itemList: quantityList,
        category: _index.QUANTITY,
        onSelect: _index.setQuantity }),
      _react2.default.createElement(_design_files2.default, null)
    ),
    _react2.default.createElement(
      "div",
      { className: "right-panel" },
      _react2.default.createElement(_main2.default, { fieldsLabel: fieldsLabel })
    )
  );
};

exports.default = Flyers;