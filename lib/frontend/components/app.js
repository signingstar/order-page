'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Match = require('react-router/Match');

var _Match2 = _interopRequireDefault(_Match);

var _Miss = require('react-router/Miss');

var _Miss2 = _interopRequireDefault(_Miss);

var _product_list = require('../containers/product_list');

var _product_list2 = _interopRequireDefault(_product_list);

var _initiate_order = require('../containers/initiate_order');

var _initiate_order2 = _interopRequireDefault(_initiate_order);

var _process_order = require('../containers/process_order');

var _process_order2 = _interopRequireDefault(_process_order);

var _confirm_order = require('../containers/confirm/confirm_order');

var _confirm_order2 = _interopRequireDefault(_confirm_order);

var _submit_order = require('./submit_order');

var _submit_order2 = _interopRequireDefault(_submit_order);

var _order_view = require('../containers/order_page/order_view');

var _order_view2 = _interopRequireDefault(_order_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    { className: 'main-section-content' },
    _react2.default.createElement(_Match2.default, { exactly: true, pattern: '/orders/:orderId', component: _order_view2.default }),
    _react2.default.createElement(_Match2.default, { exactly: true, pattern: '/order', component: _initiate_order2.default }),
    _react2.default.createElement(_Match2.default, { exactly: true, pattern: '/order/products', component: _product_list2.default }),
    _react2.default.createElement(_Match2.default, { exactly: true, pattern: '/order/process', component: _process_order2.default }),
    _react2.default.createElement(_Match2.default, { pattern: '/order/confirm', component: _confirm_order2.default }),
    _react2.default.createElement(_Match2.default, { pattern: '/order/submit', component: _submit_order2.default }),
    _react2.default.createElement(_Miss2.default, { component: function component() {
        return _react2.default.createElement(
          'div',
          null,
          'Not Found'
        );
      } })
  );
};

exports.default = App;
//# sourceMappingURL=app.js.map