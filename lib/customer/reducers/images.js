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

var updateReaction = function updateReaction(id, value, images) {
  var _Object$assign;

  if (!images[id]) return images;
  var image = Object.assign({}, images[id]);

  image[_actions.LIKES] = value;
  image[_actions.LIKED] = image[_actions.LIKED] || [];

  image[_actions.LIKED] = image[_actions.LIKED].filter(function (likeElem) {
    return likeElem.name !== 'You';
  });

  image[_actions.LIKED].push({ name: 'You', reaction_type: value });

  return Object.assign({}, images, (_Object$assign = {}, _Object$assign[id] = image, _Object$assign));
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

  for (var imageId in scores) {
    var _scores$imageId = scores[imageId],
        album_id = _scores$imageId.album_id,
        score = _scores$imageId.score;


    var _image = newState[imageId];
    _image.score = score;
    // newAlbum[imageId] = image
  }

  return newState;
};

var updateQualification = function updateQualification(params, state) {
  var imageId = params.imageId,
      albumId = params.albumId,
      qualified = params.qualified;


  var newState = Object.assign({}, state);
  var image = newState[imageId];
  image.force_qualify = { name: 'You', reaction: qualified };

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
      return updateReaction(id, value, state);

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