"use strict";

exports.__esModule = true;

var _reactRedux = require("react-redux");

var _product = require("../components/product");

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var _store$products = store.products,
      products = _store$products === undefined ? [] : _store$products;


  return {
    items: products
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_product2.default);