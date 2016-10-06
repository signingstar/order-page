'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Match = require('react-router/Match');

var _Match2 = _interopRequireDefault(_Match);

var _Miss = require('react-router/Miss');

var _Miss2 = _interopRequireDefault(_Miss);

var _home = require('../containers/home');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var pathname = _ref.pathname;
  return _react2.default.createElement(
    'div',
    { className: 'main-section-content' },
    _react2.default.createElement(_Match2.default, { exactly: true, pattern: '/order/:usersHash/:orderId', component: _home2.default })
  );
};

exports.default = App;
//# sourceMappingURL=app.js.map