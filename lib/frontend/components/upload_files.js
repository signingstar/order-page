"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _image_list = require("../containers/image_list");

var _image_list2 = _interopRequireDefault(_image_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadFiles = function UploadFiles(_ref) {
  var label = _ref.label;
  var placeholder = _ref.placeholder;
  var onDrop = _ref.onDrop;
  var onRemove = _ref.onRemove;
  var accept = _ref.accept;
  var uploadImage = _ref.uploadImage;
  var queued = _ref.queued;
  var queuedSize = _ref.queuedSize;
  var uploaded = _ref.uploaded;
  var uploadedSize = _ref.uploadedSize;

  var albumName = void 0,
      dropzone = void 0;

  return _react2.default.createElement(
    "div",
    { className: "file-upload-area" },
    _react2.default.createElement(
      "form",
      { onSubmit: function onSubmit(e) {
          return uploadImage(e, albumName);
        } },
      _react2.default.createElement(
        "div",
        { className: "album-name large-field required" },
        _react2.default.createElement(
          "label",
          { htmlFor: "mainAlbum" },
          "Album Name"
        ),
        _react2.default.createElement("input", {
          type: "text",
          defaultValue: "All",
          required: true,
          ref: function ref(node) {
            albumName = node;
          }
        })
      ),
      _react2.default.createElement(
        _reactDropzone2.default,
        {
          className: "upload-box",
          onDrop: onDrop,
          activeClassName: "active",
          rejectClassName: "reject",
          accept: accept,
          ref: function ref(node) {
            dropzone = node;
          }
        },
        _react2.default.createElement(
          "div",
          { className: "upload-content" },
          _react2.default.createElement(_image_list2.default, { onRemove: onRemove })
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "upload-footer" },
        _react2.default.createElement(
          "div",
          { className: "action" },
          _react2.default.createElement(
            "div",
            { className: "upload-action " },
            _react2.default.createElement("input", { type: "button", value: "Add Images", onClick: function onClick() {
                return dropzone.open();
              } })
          ),
          _react2.default.createElement(
            "div",
            { className: "upload-action " },
            _react2.default.createElement("input", { type: "submit", value: "Start Upload" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "status" },
          _react2.default.createElement(
            "div",
            { className: "queued status" },
            "Queued: ",
            queued,
            " ",
            queuedSize ? "(" + queuedSize + ")" : undefined,
            " "
          ),
          _react2.default.createElement(
            "div",
            { className: "uploaded status" },
            "Uploaded: ",
            uploaded,
            " ",
            uploadedSize ? "(" + uploadedSize + ")" : undefined
          )
        )
      )
    )
  );
};

exports.default = UploadFiles;
//# sourceMappingURL=upload_files.js.map