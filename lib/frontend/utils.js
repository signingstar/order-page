'use strict';

exports.__esModule = true;
var getPreciseSize = exports.getPreciseSize = function getPreciseSize(size) {
  var unitFactor = 1024 * 1024 * 1024;
  return size ? size > unitFactor ? (size / unitFactor).toFixed(2) + ' GB' : (size / (1024 * 1024)).toFixed(2) + ' MB' : 0;
};

var imageMapToList = exports.imageMapToList = function imageMapToList(albums) {
  if (Object.keys(albums).length === 0) {
    return;
  }

  var keys = Object.keys(albums).sort(function (id1, id2) {
    return albums[id1].priority - albums[id2].priority;
  });
  var imageList = keys.map(function (albumId) {
    var _albums$albumId = albums[albumId];
    var id = _albums$albumId.id;
    var name = _albums$albumId.name;
    var priority = _albums$albumId.priority;
    var _albums$albumId$files = _albums$albumId.files;
    var files = _albums$albumId$files === undefined ? [] : _albums$albumId$files;

    var uploadedFile = files.filter(function (file) {
      return file.uploaded;
    });
    var size = uploadedFile.length > 1 ? uploadedFile.reduce(function (prev, curr) {
      return prev + curr.size;
    }, 0) : uploadedFile.length > 0 ? uploadedFile[0].size : 0;

    return { id: albumId, priority: priority, name: name, count: uploadedFile.length, size: getPreciseSize(size) };
  });

  return imageList;
};
//# sourceMappingURL=utils.js.map