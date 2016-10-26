"use strict";

exports.__esModule = true;

var _reactRedux = require("react-redux");

var _upload_footer = require("../components/upload_footer");

var _upload_footer2 = _interopRequireDefault(_upload_footer);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var albumId = ownProps.albumId;

  var album = store.albums[albumId];
  var queued = album.queued;
  var queuedSize = album.queuedSize;
  var uploaded = album.uploaded;
  var uploadedSize = album.uploadedSize;


  return {
    queued: queued || 0,
    queuedSize: (0, _utils.getPreciseSize)(queuedSize),
    uploaded: uploaded || 0,
    uploadedSize: (0, _utils.getPreciseSize)(uploadedSize)
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_upload_footer2.default);
//# sourceMappingURL=upload_footer.js.map