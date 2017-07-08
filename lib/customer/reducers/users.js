'use strict';

exports.__esModule = true;
var users = function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      params = _ref.params;


  var index = void 0,
      newState = void 0;
  switch (type) {
    case 'ADD_USER':
      if (!params) return state;

      newState = state.slice();
      index = newState.findIndex(function (user) {
        return user.email === params.email;
      });

      if (index > -1) {
        newState[index] = params;
      } else {
        newState.push(params);
      }

      return newState;

    case 'DELETE_USER':
      if (!params) return state;

      newState = state.slice();
      index = newState.findIndex(function (user) {
        return user.email === params.email;
      });

      if (index > -1) {
        newState.splice(index, 1);
      }

      return newState;

    default:
      return state;
  }
};

exports.default = users;