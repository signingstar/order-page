'use strict';

exports.__esModule = true;

var _actions = require('../actions');

var updateFeedback = function updateFeedback(index, _ref, state) {
  var key = _ref.key,
      value = _ref.value;

  var image = Object.assign({}, state[index]);

  image[key] = value;

  var newState = state.slice();
  newState[index] = image;

  return newState;
};

var findImage = function findImage(albumId, newState, index) {
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

  return image;
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
    for (var _album2 in newState) {
      var currentAlbumLength = newState[_album2].files.length;
      if (index >= currentIndex + currentAlbumLength) {
        currentIndex += currentAlbumLength;
      } else {
        _album2 = Object.assign({}, newState[_album2]);
        _album2.files = _album2.files.slice();
        image = _album2.files[index - currentIndex];
        break;
      }
    }
  }

  image[_actions.LIKES] = value;
  image[_actions.LIKED] = image[_actions.LIKED] || [];
  var reactionObj = image[_actions.LIKED].find(function (like) {
    return like.name === 'You';
  });

  if (reactionObj) {
    reactionObj.reaction_type = value;
  } else {
    image[_actions.LIKED].push({ name: 'You', reaction_type: value });
  }

  return newState;
};

var mergeReactions = function mergeReactions(obj, state) {
  var newState = Object.assign({}, state);

  var currentIndex = 0;

  var _loop = function _loop(uuid) {
    var _obj$uuid = obj[uuid],
        albumId = _obj$uuid.albumId,
        likes = _obj$uuid.likes,
        liked = _obj$uuid.liked,
        forceQualify = _obj$uuid.forceQualify;

    var album = Object.assign({}, state[albumId]);
    var files = album.files = album.files.slice();
    var image = files.find(function (file) {
      return file.id === uuid;
    });

    image[_actions.LIKES] = likes;
    image[_actions.LIKED] = liked;

    if (forceQualify) {
      image.forceQualify = forceQualify;
    }
  };

  for (var uuid in obj) {
    _loop(uuid);
  }

  return newState;
};

var mergeScore = function mergeScore(scores, state) {
  var newState = Object.assign({}, state);
  var albums = {};

  var _loop2 = function _loop2(imageId) {
    var _scores$imageId = scores[imageId],
        album_id = _scores$imageId.album_id,
        score = _scores$imageId.score;

    var newAlbum = albums[album_id];
    if (!newAlbum) {
      newAlbum = albums[album_id] = Object.assign({}, newState[album_id]);
    }

    var files = newAlbum.files.slice();
    var image = files.find(function (file) {
      return file.id === imageId;
    });
    image.score = score;
    // newAlbum[imageId] = image
  };

  for (var imageId in scores) {
    _loop2(imageId);
  }

  return newState;
};

var updateQualification = function updateQualification(params, state) {
  var imageId = params.imageId,
      albumId = params.albumId,
      qualified = params.qualified;


  var newState = Object.assign({}, state);
  var albums = {};

  var newAlbum = Object.assign({}, newState[albumId]);

  var files = newAlbum.files.slice();
  var image = files.find(function (file) {
    return file.id === imageId;
  });
  image.forceQualify = { name: 'You', reaction_type: qualified };

  return newState;
};

var images = function images() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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

    case 'UPDATE_SCORE':
      return mergeScore(params, state);

    case 'UPDATE_QUALIFICATION':
      return updateQualification(params, state);

    default:
      return state;
  }
};

exports.default = images;
//# sourceMappingURL=images.js.map