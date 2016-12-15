'use strict';

exports.__esModule = true;
exports.fetchImagesByUser = exports.updateQualification = exports.deleteUser = exports.addUser = exports.getImageFeedback = exports.sendImageFeedback = exports.updateReactionChangeUser = exports.updateReactionFirstLoad = exports.updateImageQualification = exports.updateScore = exports.deleteUserFromStore = exports.addUserToStore = exports.mergeReactions = exports.commentOnImage = exports.updateReaction = exports.USER_ROLES = exports.VISITOR = exports.CONTRIBUTOR = exports.ADMIN = exports.MERGE_REACTIONS = exports.COMMENT_ON_IMAGE = exports.UPDATE_REACTION = exports.LIST_VIEW = exports.THUMBNAIL_VIEW = exports.UNQUALIFIED = exports.QUALIFIED = exports.ALL = exports.DEFAULT_REACTION = exports.LOVE = exports.LIKE = exports.DISLIKE = exports.LIKED = exports.LIKES = undefined;

var _USER_ROLES;

var _jquery = require('jquery');

var LIKES = exports.LIKES = 'likes';
var LIKED = exports.LIKED = 'liked';

var DISLIKE = exports.DISLIKE = 0;
var LIKE = exports.LIKE = 1;
var LOVE = exports.LOVE = 2;
var DEFAULT_REACTION = exports.DEFAULT_REACTION = -1;

var ALL = exports.ALL = 'all';
var QUALIFIED = exports.QUALIFIED = 'qualified';
var UNQUALIFIED = exports.UNQUALIFIED = 'unqualified';

var THUMBNAIL_VIEW = exports.THUMBNAIL_VIEW = 'thumbnail';
var LIST_VIEW = exports.LIST_VIEW = 'list';

// ------------------- Customer Portal Actions --------------------------
var UPDATE_REACTION = exports.UPDATE_REACTION = 'UPDATE_REACTION';
var COMMENT_ON_IMAGE = exports.COMMENT_ON_IMAGE = 'COMMENT_ON_IMAGE';
var MERGE_REACTIONS = exports.MERGE_REACTIONS = 'MERGE_REACTIONS';

var ADMIN = exports.ADMIN = 5;
var CONTRIBUTOR = exports.CONTRIBUTOR = 3;
var VISITOR = exports.VISITOR = 1;

var USER_ROLES = exports.USER_ROLES = (_USER_ROLES = {}, _USER_ROLES[ADMIN] = { shortDescription: 'Admin', description: 'Admin - Full Access' }, _USER_ROLES[CONTRIBUTOR] = { shortDescription: 'Contributor', description: 'Contributor - Limited Access' }, _USER_ROLES[VISITOR] = { shortDescription: 'Visitor', description: 'Visitor - View Access' }, _USER_ROLES);

var updateReaction = exports.updateReaction = function updateReaction(image, value, albumId) {
  var id = image.id,
      index = image.index;


  return {
    type: UPDATE_REACTION,
    params: { id: id, index: index, value: value, albumId: albumId }
  };
};

var commentOnImage = exports.commentOnImage = function commentOnImage(image, value) {
  var id = image.id,
      index = image.index;


  return {
    type: COMMENT_ON_IMAGE,
    params: { id: id, index: index, value: value }
  };
};

var mergeReactions = exports.mergeReactions = function mergeReactions(obj) {
  return {
    type: MERGE_REACTIONS,
    params: obj
  };
};

var addUserToStore = exports.addUserToStore = function addUserToStore(email, role) {
  return {
    type: 'ADD_USER',
    params: { email: email, role: role }
  };
};

var deleteUserFromStore = exports.deleteUserFromStore = function deleteUserFromStore(email) {
  return {
    type: 'DELETE_USER',
    params: { email: email }
  };
};

var updateScore = exports.updateScore = function updateScore(scores) {
  return {
    type: 'UPDATE_SCORE',
    params: scores
  };
};

var updateImageQualification = exports.updateImageQualification = function updateImageQualification(imageId, albumId, qualified) {
  return {
    type: 'UPDATE_QUALIFICATION',
    params: { imageId: imageId, albumId: albumId, qualified: qualified }
  };
};

var updateReactionFirstLoad = exports.updateReactionFirstLoad = function updateReactionFirstLoad(files, imageSet) {
  return {
    type: 'FIRST_LOAD',
    params: { files: files, imageSet: imageSet }
  };
};

var updateReactionChangeUser = exports.updateReactionChangeUser = function updateReactionChangeUser(files, imageSet, user) {
  return {
    type: 'CHANGE_USER',
    params: { files: files, imageSet: imageSet, user: user }
  };
};

//------------------------------ AJAX calls -------------------------------

var sendImageFeedback = exports.sendImageFeedback = function sendImageFeedback(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/customer/notify',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ textStatus: textStatus });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var getImageFeedback = exports.getImageFeedback = function getImageFeedback(data, cb) {
  (0, _jquery.ajax)({
    method: 'GET',
    url: '/order/customer/feedback',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res, textStatus: textStatus });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var addUser = exports.addUser = function addUser(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/customer/adduser',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res, textStatus: textStatus });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var deleteUser = exports.deleteUser = function deleteUser(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/customer/deleteuser',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res, textStatus: textStatus });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var updateQualification = exports.updateQualification = function updateQualification(data, cb) {
  (0, _jquery.ajax)({
    method: 'POST',
    url: '/order/customer/qualify',
    data: data,
    dataType: 'json'
  }).done(function (res, textStatus) {
    return cb({ res: res, textStatus: textStatus });
  }).fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};

var fetchImagesByUser = exports.fetchImagesByUser = function fetchImagesByUser(data, cb) {
  var posting = post('/order/customer/byuser', data);

  posting.done(function (res, textStatus) {
    return cb({ res: res });
  });
  posting.fail(function (xhr, status, err) {
    return cb({ err: xhr.responseJSON, status: xhr.status });
  });
};
//# sourceMappingURL=actions.js.map