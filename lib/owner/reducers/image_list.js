"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var imageList = function imageList() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref = arguments[1];
  var type = _ref.type,
      params = _ref.params;

  switch (type) {
    case _actions.POPULATE_IMAGES:
      return params || {};

    case _actions.SWAP_ALBUM:
      var src = params.src,
          dest = params.dest;

      var newState = state.slice();
      var srcAlbum = newState[src];
      var tempPriority = srcAlbum.priority;

      srcAlbum.priority = newState[dest].priority;
      newState[dest].priority = tempPriority;
      newState.splice(src, 1);
      newState.splice(dest, 0, srcAlbum);

      return newState;
  }

  return state;
};

exports.default = imageList;