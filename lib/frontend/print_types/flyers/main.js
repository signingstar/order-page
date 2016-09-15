"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _presenter = require("../../presenter");

var _presenter2 = _interopRequireDefault(_presenter);

var _print_combination = require("./print_combination");

var _print_combination2 = _interopRequireDefault(_print_combination);

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _index = require("../../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flyers = function (_React$Component) {
  _inherits(Flyers, _React$Component);

  function Flyers() {
    _classCallCheck(this, Flyers);

    var _this = _possibleConstructorReturn(this, (Flyers.__proto__ || Object.getPrototypeOf(Flyers)).call(this));

    _this.init();
    return _this;
  }

  _createClass(Flyers, [{
    key: "init",
    value: function init() {
      this.presenter = new _presenter2.default(_print_combination2.default);
    }
  }, {
    key: "getCategories",
    value: function getCategories(location) {
      var orderPath = /^\/order[\/]?([a-z]+)\-([a-z0-9\-]*)$/;
      location.pathname.match(orderPath);

      var category = RegExp.$1;
      var subCategory = RegExp.$2;

      return { category: category, subCategory: subCategory };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props;
      var categoryFromStore = _props.categoryFromStore;
      var location = _props.location;
      var setCategories = _props.setCategories;

      var _getCategories = this.getCategories(location);

      var category = _getCategories.category;
      var subCategory = _getCategories.subCategory;


      if (category !== categoryFromStore) {
        setCategories(category);
      }
    }
  }, {
    key: "getLabelForFields",
    value: function getLabelForFields(_ref) {
      var category = _ref.category;
      var size = _ref.size;
      var material = _ref.material;
      var coat = _ref.coat;
      var quantity = _ref.quantity;

      var typeLabel = this.presenter.fetchLabelForCategoryAndId(_index.CATEGORY, category);
      var sizeLabel = this.presenter.fetchLabelForCategoryAndId(_index.SIZE, size);
      var materialLabel = this.presenter.fetchLabelForCategoryAndId(_index.SURFACE, material);
      var coatLabel = this.presenter.fetchLabelForCategoryAndId(_index.COATING, coat);
      var quantityLabel = this.presenter.fetchLabelForCategoryAndId(_index.QUANTITY, quantity);

      var labelMap = new Map();
      labelMap.set(_index.SIZE, { label: 'Print Size', value: sizeLabel });
      labelMap.set(_index.SURFACE, { label: 'Paper Material', value: materialLabel });
      labelMap.set(_index.COATING, { label: 'Coating', value: coatLabel });
      labelMap.set(_index.QUANTITY, { label: 'Quantity', value: quantityLabel });

      return {
        category: typeLabel,
        fieldsMap: labelMap
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props;
      var size = _props2.size;
      var material = _props2.material;
      var coat = _props2.coat;
      var quantity = _props2.quantity;
      var location = _props2.location;

      var category = this.category || this.getCategories(location).subCategory;

      var sizeList = this.presenter.printableDataWithFilter(_index.SIZE, { category: category });
      var materialList = this.presenter.printableDataWithFilter(_index.SURFACE, { category: category, size: size });
      var coatList = this.presenter.printableDataWithFilter(_index.COATING, { category: category, size: size, material: material });
      var quantityList = this.presenter.printableDataWithFilter(_index.QUANTITY, { category: category, size: size, material: material });

      var fieldsLabel = this.getLabelForFields({ category: category, size: size, material: material, coat: coat, quantity: quantity });
      var filtersList = { sizeList: sizeList, materialList: materialList, coatList: coatList, quantityList: quantityList };

      return _react2.default.createElement(_component2.default, { filtersList: filtersList, fieldsLabel: fieldsLabel, category: category });
    }
  }]);

  return Flyers;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(orderApp, ownProps) {
  var _orderApp$selectionSt = orderApp.selectionState;
  var size = _orderApp$selectionSt.size;
  var material = _orderApp$selectionSt.material;
  var coat = _orderApp$selectionSt.coat;
  var quantity = _orderApp$selectionSt.quantity;


  return {
    categoryFromStore: orderApp.categoryState.category,
    size: size,
    material: material,
    coat: coat,
    quantity: quantity
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    setCategories: function setCategories(category, subCategory) {
      dispatch((0, _index.setAllCategories)(category, subCategory));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Flyers);