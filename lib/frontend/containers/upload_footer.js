"use strict";

exports.__esModule = true;

var _reactRedux = require("react-redux");

var _upload_footer = require("../components/upload_footer");

var _upload_footer2 = _interopRequireDefault(_upload_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPreciseSize = function getPreciseSize(size) {
  var unitFactor = 1024 * 1024 * 1024;
  return size ? size > unitFactor ? (size / unitFactor).toFixed(2) + ' GB' : (size / (1024 * 1024)).toFixed(2) + ' MB' : 0;
};

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var albumId = ownProps.albumId;

  var album = store.albums[albumId];
  var queued = album.queued;
  var queuedSize = album.queuedSize;
  var uploaded = album.uploaded;
  var uploadedSize = album.uploadedSize;


  return {
    queued: queued || 0,
    queuedSize: getPreciseSize(queuedSize),
    uploaded: uploaded || 0,
    uploadedSize: getPreciseSize(uploadedSize)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_upload_footer2.default);
//# sourceMappingURL=upload_footer.js.map