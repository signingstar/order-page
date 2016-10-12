'use strict';

exports.__esModule = true;
var users = function users() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var params = _ref.params;

  switch (type) {
    case 'ADD_USER':
      var newState = state.slice();
      newState.push(params);
      return newState;

    default:
      return state;
  }
};

exports.default = users;
//# sourceMappingURL=users.js.map