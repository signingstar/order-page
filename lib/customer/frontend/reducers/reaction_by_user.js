'use strict';

exports.__esModule = true;

var _actions = require('../actions');

var filteredImages = function filteredImages(files, imageSet, filter, user) {
  if (user) {
    return files.filter(function (file) {
      return imageSet[file][_actions.LIKED].findIndex(function (_ref) {
        var name = _ref.name,
            reaction_type = _ref.reaction_type;
        return name === user && +reaction_type === filter;
      }) > -1;
    }).length;
  }
  return files.filter(function (file) {
    return imageSet[file][_actions.LIKES] === filter;
  }).length;
};

var users = function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref2 = arguments[1];
  var type = _ref2.type,
      _ref2$params = _ref2.params,
      params = _ref2$params === undefined ? {} : _ref2$params;
  var files = params.files,
      imageSet = params.imageSet,
      filter = params.filter,
      user = params.user;


  switch (type) {
    case 'FIRST_LOAD':
      return {
        reaction: _actions.LIKE,
        user: 'you',
        count: [filteredImages(files, imageSet, _actions.LIKE), filteredImages(files, imageSet, _actions.DISLIKE), filteredImages(files, imageSet, _actions.LOVE)]
      };
    case 'CHANGE_USER':
      return {
        reaction: _actions.LIKE,
        user: user,
        count: [filteredImages(files, imageSet, _actions.LIKE, user.value), filteredImages(files, imageSet, _actions.DISLIKE, user.value), filteredImages(files, imageSet, _actions.LOVE, user.value)]
      };

    default:
      return state;
  }
};

exports.default = users;
//# sourceMappingURL=reaction_by_user.js.map