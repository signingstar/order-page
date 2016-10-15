"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _upload_files = require("../components/upload_files");

var _upload_files2 = _interopRequireDefault(_upload_files);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadFiles = function (_React$Component) {
  _inherits(UploadFiles, _React$Component);

  function UploadFiles() {
    _classCallCheck(this, UploadFiles);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.onImageAdd = _this.onImageAdd.bind(_this);
    _this.onImageRemove = _this.onImageRemove.bind(_this);

    _this.state = {
      queued: 0,
      queuedSize: 0,
      uploaded: 0,
      uploadedSize: 0
    };
    return _this;
  }

  UploadFiles.prototype.handleSubmit = function handleSubmit(e, input) {
    e.preventDefault();

    var albumName = input.value;
    if (!albumName.trim()) {
      return;
    }

    albumName = albumName.trim();

    var _props = this.props;
    var image = _props.image;
    var order = _props.order;
    var onUpload = _props.onUpload;

    var images = image.files;
    var formData = new FormData();
    var imageSize = 0;

    formData.append('order_id', order && order.id ? order.id : 64);
    formData.append('album_name', albumName);

    images.map(function (image) {
      formData.append('images', image);
      imageSize += image.size;
    });

    (0, _actions.uploadImages)(formData, onUpload);
  };

  UploadFiles.prototype.onImageAdd = function onImageAdd(images) {
    var onDrop = this.props.onDrop;

    onDrop(images);
  };

  UploadFiles.prototype.onImageRemove = function onImageRemove(e, image) {
    var onRemove = this.props.onRemove;

    onRemove(e, image);
  };

  UploadFiles.prototype.getPreciseSize = function getPreciseSize(size) {
    var unitFactor = 1024 * 1024 * 1024;
    return size ? size > unitFactor ? (size / unitFactor).toFixed(2) + ' GB' : (size / (1024 * 1024)).toFixed(2) + ' MB' : 0;
  };

  UploadFiles.prototype.render = function render() {
    var label = 'Print Design';
    var placeholder = 'Drop your files here, or click anywhere in this box to select files to upload';
    var acceptFiles = 'image/jpeg, image/png, .ai';

    var _props2 = this.props;
    var onRemove = _props2.onRemove;
    var image = _props2.image;
    var queued = image.queued;
    var queuedSize = image.queuedSize;
    var uploaded = image.uploaded;
    var uploadedSize = image.uploadedSize;


    return _react2.default.createElement(_upload_files2.default, {
      label: label,
      placeholder: placeholder,
      onDrop: this.onImageAdd,
      accept: acceptFiles,
      queued: queued || 0,
      queuedSize: this.getPreciseSize(queuedSize),
      uploaded: uploaded || 0,
      uploadedSize: this.getPreciseSize(uploadedSize),
      onRemove: this.onImageRemove,
      uploadImage: this.handleSubmit
    });
  };

  return UploadFiles;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  return {
    order: store.order,
    image: store.image
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDrop: function onDrop(images) {
      dispatch((0, _actions.setImages)(images));
    },

    onRemove: function onRemove(e, image) {
      e.stopPropagation();
      dispatch((0, _actions.removeImage)(image));
    },

    onUpload: function onUpload() {
      dispatch((0, _actions.setImageUploaded)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadFiles);
//# sourceMappingURL=upload_files.js.map