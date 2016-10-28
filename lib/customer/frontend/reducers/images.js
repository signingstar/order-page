"use strict";

exports.__esModule = true;

var _actions = require("../actions");

var updateFeedback = function updateFeedback(index, _ref, state) {
  var key = _ref.key,
      value = _ref.value;

  var image = Object.assign({}, state[index]);

  image[key] = value;

  var newState = state.slice();
  newState[index] = image;

  return newState;
};

var updateReaction = function updateReaction(index, value, state, albumId) {
  var newState = Object.assign({}, state);

  var album = void 0,
      image = void 0;

  if (albumId) {
    album = Object.assign({}, newState[albumId]);
    album.files = album.files.slice();
    image = album.files[index];
  } else {
    var currentIndex = 0;
    for (var _album in newState) {
      var currentAlbumLength = newState[_album].files.length;
      if (index >= currentIndex + currentAlbumLength) {
        currentIndex += currentAlbumLength;
      } else {
        _album = Object.assign({}, newState[_album]);
        _album.files = _album.files.slice();
        image = _album.files[index - currentIndex];
        break;
      }
    }
  }

  image[_actions.LIKES] = value;

  return newState;
};

var mergeReactions = function mergeReactions(obj, state) {
  var newState = Object.assign({}, state);

  var currentIndex = 0;

  var _loop = function _loop(uuid) {
    var value = obj[uuid];
    var album = Object.assign({}, state[value.albumId]);
    var files = album.files = album.files.slice();
    var image = files.find(function (file) {
      return file.id === uuid;
    });

    image[_actions.LIKES] = value.likes;
    image[_actions.LIKED] = value.liked;
  };

  for (var uuid in obj) {
    _loop(uuid);
  }

  return newState;
};

var images = function images() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref2 = arguments[1];
  var type = _ref2.type,
      _ref2$params = _ref2.params,
      params = _ref2$params === undefined ? {} : _ref2$params;
  var id = params.id,
      index = params.index,
      value = params.value,
      albumId = params.albumId;

  var newState = void 0,
      image = void 0;

  switch (type) {
    case _actions.UPDATE_REACTION:
      return updateReaction(index, value, state, albumId);

    case _actions.MERGE_REACTIONS:
      return mergeReactions(params, state);

    default:
      return state;
  }
};

exports.default = images;
//# sourceMappingURL=images.js.map