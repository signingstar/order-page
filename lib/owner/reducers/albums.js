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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      _ref$params = _ref.params,
      params = _ref$params === undefined ? [] : _ref$params;

  var newState = void 0,
      newAlbum = void 0,
      imageSize = 0;
  switch (type) {
    case _actions.UPDATE_ORDER:
      params = params.albumData;
    case 'ADD_ALBUM':
      newState = Object.assign({}, state);

      newState[params.id] = { name: params.name, priority: params.priority };

      return newState;

    case _actions.SET_IMAGES:
      newState = Object.assign({}, state);
      var _params = params,
          albumId = _params.albumId,
          images = _params.images;

      newAlbum = newState[albumId] = Object.assign({}, state[albumId]);
      var files = newAlbum.files ? newAlbum.files.slice() : [];

      if (!newAlbum.queued && !newAlbum.uploaded) {
        Object.assign(newAlbum, defaultState);
      }

      images.forEach(function (image) {
        files.push(image);
        imageSize += image.size;
      });

      newAlbum.files = files;
      Object.assign(newAlbum, { queued: (newAlbum.queued || 0) + images.length, queuedSize: (newAlbum.queuedSize || 0) + imageSize });

      return newState;
    case 'REMOVE_IMAGE':
      newState = Object.assign({}, state);
      var _params2 = params,
          albumId = _params2.albumId,
          image = _params2.image;

      newState[albumId] = Object.assign({}, state[albumId]);
      newAlbum = newState[albumId];
      var files = newAlbum.files.slice();

      var index = files.findIndex(function (file) {
        return file.name === image.name;
      });

      if (index > -1) {
        files.splice(index, 1);
      }

      newAlbum.files = files;

      if (!image.uploaded) {
        Object.assign(newAlbum, { queued: newAlbum.queued - 1, queuedSize: newAlbum.queuedSize - image.size });
      } else {
        Object.assign(newAlbum, { uploaded: newAlbum.uploaded - 1, uploadedSize: newAlbum.uploadedSize - image.size });
      }

      return newState;

    case 'SET_IMAGE_UPLOADED':
      newState = Object.assign({}, state);
      newState[params] = Object.assign({}, state[params]);
      newAlbum = newState[params];

      newAlbum.files.forEach(function (image) {
        image.uploaded = true;
        imageSize += image.size;
      });

      Object.assign(newAlbum, {
        uploaded: newAlbum.files.length,
        uploadedSize: imageSize,
        queued: 0,
        queuedSize: 0
      });

      return newState;

    case 'REMOVE_ALBUM':
      newState = Object.assign({}, state);
      delete newState[params];

      return newState;

    default:
      return state;
  }
};

exports.default = image;
//# sourceMappingURL=albums.js.map