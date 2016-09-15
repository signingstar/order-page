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

var _index = require("../../actions/index");

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Broucher = function (_React$Component) {
  _inherits(Broucher, _React$Component);

  function Broucher() {
    _classCallCheck(this, Broucher);

    var _this = _possibleConstructorReturn(this, (Broucher.__proto__ || Object.getPrototypeOf(Broucher)).call(this));

    _this.init();
    return _this;
  }

  _createClass(Broucher, [{
    key: "init",
    value: function init() {
      this.presenter = new _presenter2.default(_print_combination2.default);
    }
  }, {
    key: "getCategories",
    value: function getCategories(location) {
      var orderPath = /^\/order[\/]?([a-z]+)[a-z0-9\-]*$/;
      location.pathname.match(orderPath);

      var category = RegExp.$1;

      return { category: category };
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
      var paper_quality = _ref.paper_quality;
      var fold = _ref.fold;

      var typeLabel = this.presenter.fetchLabelForCategoryAndId(_index.CATEGORY, category);
      var foldLabel = this.presenter.fetchLabelForCategoryAndId(_index.FOLD, fold);
      var paperQualityLabel = this.presenter.fetchLabelForCategoryAndId(_index.PAPER_QUALITY, paper_quality);
      var coatLabel = this.presenter.fetchLabelForCategoryAndId(_index.COATING, coat);
      var quantityLabel = this.presenter.fetchLabelForCategoryAndId(_index.QUANTITY, quantity);

      var labelMap = new Map();
      labelMap.set(_index.FOLD, { label: 'Print Fold', value: foldLabel });
      labelMap.set(_index.PAPER_QUALITY, { label: 'Paper Quality', value: paperQualityLabel });
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
      var location = _props2.location;
      var paper_quality = _props2.paper_quality;
      var fold = _props2.fold;
      var coat = _props2.coat;
      var quantity = _props2.quantity;
      var setType = _props2.setType;

      var category = this.category || this.getCategories(location).category;

      var coatList = this.presenter.printableDataWithFilter(_index.COATING);
      var foldList = this.presenter.printableDataWithFilter(_index.FOLD);
      var quantityList = this.presenter.printableDataWithFilter(_index.QUANTITY);
      var paperQualityList = this.presenter.printableDataWithFilter(_index.PAPER_QUALITY);

      var fieldsLabel = this.getLabelForFields({ category: category, paper_quality: paper_quality, coat: coat, fold: fold, quantity: quantity });

      return _react2.default.createElement(_component2.default, {
        foldList: foldList,
        coatList: coatList,
        paperQualityList: paperQualityList,
        quantityList: quantityList,
        fieldsLabel: fieldsLabel });
    }
  }]);

  return Broucher;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(orderApp, ownProps) {
  var _orderApp$selectionSt = orderApp.selectionState;
  var paper_quality = _orderApp$selectionSt.paper_quality;
  var coat = _orderApp$selectionSt.coat;
  var fold = _orderApp$selectionSt.fold;
  var quantity = _orderApp$selectionSt.quantity;


  return {
    categoryFromStore: orderApp.categoryState.category,
    paper_quality: paper_quality,
    coat: coat,
    fold: fold,
    quantity: quantity
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    setCategories: function setCategories(category) {
      dispatch((0, _index.setCategory)(category));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Broucher);