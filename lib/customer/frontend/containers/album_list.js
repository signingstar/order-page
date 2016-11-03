"use strict";

exports.__esModule = true;

var _reactRedux = require("react-redux");

var _album_list = require("../components/album_list");

var _album_list2 = _interopRequireDefault(_album_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images,
      albums = store.albums;


  var albumList = Object.keys(albums).map(function (albumId) {
    return { id: albumId, name: albums[albumId].name, priority: albums[albumId].priority };
  });

  albumList.sort(function (prev, curr) {
    return prev.priority - curr.priority;
  });

  return {
    albums: albumList
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_album_list2.default);
//# sourceMappingURL=album_list.js.map