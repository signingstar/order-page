'use strict';

exports.__esModule = true;

var _actions = require('../actions');

var defaultState = {
  queued: 0,
  queuedSize: 0,
  uploaded: 0,
  uploadedSize: 0
};

var image = function image() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var _ref$params = _ref.params;
  var params = _ref$params === undefined ? [] : _ref$params;

  var newState = void 0,
      imageSize = 0;
  switch (type) {
    case _actions.SET_IMAGES:
      newState = Object.assign({}, state);
      var files = newState.files ? newState.files.slice() : [];

      if (!state.queued && !state.uploaded) {
        Object.assign(newState, defaultState);
      }

      params.forEach(function (image) {
        files.push(image);
        imageSize += image.size;
      });

      newState.files = files;
      Object.assign(newState, { queued: newState.queued + params.length, queuedSize: newState.queuedSize + imageSize });
      return newState;
    case 'REMOVE_IMAGE':
      newState = Object.assign({}, state);
      var files = newState.files.slice();

      var index = files.findIndex(function (image) {
        return image.name === params.name;
      });

      if (index > -1) {
        files.splice(index, 1);
      }

      newState.files = files;
      Object.assign(newState, { queued: newState.queued - 1, queuedSize: newState.queuedSize - params.size });

      return newState;

    case 'SET_IMAGE_UPLOADED':
      newState = Object.assign({}, state);

      newState.files.forEach(function (image) {
        imageSize += image.size;
      });

      Object.assign(newState, {
        uploaded: newState.files.length,
        uploadedSize: imageSize,
        queued: 0,
        queuedSize: 0
      });

      return newState;

    default:
      return state;
  }
};

exports.default = image;
//# sourceMappingURL=image.js.map