"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var updateFeedback = function updateFeedback(index, _ref, state) {
  var key = _ref.key;
  var value = _ref.value;

  var image = Object.assign({}, state[index]);

  image[key] = value;

  var newState = state.slice();
  newState[index] = image;

  return newState;
};

var updateReaction = function updateReaction(index, value, state) {
  var image = Object.assign({}, state[index]);

  image[_actions.LIKES] = value;

  var newState = state.slice();
  newState[index] = image;

  return newState;
};

var mergeReactions = function mergeReactions(obj, state) {
  var newState = state.slice();

  for (var i in obj) {
    var value = obj[i];
    var image = Object.assign({}, state[i]);
    console.log("before: " + JSON.stringify(image));

    image[_actions.LIKES] = value.likes;
    image[_actions.LIKED] = value.liked;
    newState[i] = image;
  }

  return newState;
};

var images = function images() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref2 = arguments[1];
  var type = _ref2.type;
  var _ref2$params = _ref2.params;
  var params = _ref2$params === undefined ? {} : _ref2$params;
  var id = params.id;
  var index = params.index;
  var value = params.value;

  var newState = void 0,
      image = void 0;

  switch (type) {
    case _actions.UPDATE_REACTION:
      return updateReaction(index, value, state);

    case _actions.MERGE_REACTIONS:
      return mergeReactions(params, state);

    default:
      return state;
  }
};

exports.default = images;
//# sourceMappingURL=images.js.map