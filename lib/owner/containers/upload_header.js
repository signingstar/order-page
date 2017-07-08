"use strict";

exports.__esModule = true;

var _reactRedux = require("react-redux");

var _upload_header = require("../components/upload_header");

var _upload_header2 = _interopRequireDefault(_upload_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var albumId = ownProps.albumId;

  var album = store.albums[albumId];
  var name = album.name,
      queued = album.queued;


  return {
    queued: queued || 0,
    albumCount: Object.keys(store.albums).length,
    albumName: name
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_upload_header2.default);