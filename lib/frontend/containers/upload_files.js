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

var UploadFilesHandler = function (_React$Component) {
  _inherits(UploadFilesHandler, _React$Component);

  function UploadFilesHandler() {
    _classCallCheck(this, UploadFilesHandler);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.onImageAdd = _this.onImageAdd.bind(_this);
    _this.onImageRemove = _this.onImageRemove.bind(_this);
    _this.onAlbumRemove = _this.onAlbumRemove.bind(_this);
    _this.handleNameChange = _this.handleNameChange.bind(_this);
    return _this;
  }

  UploadFilesHandler.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    var _props = this.props;
    var image = _props.image;
    var index = _props.index;
    var order = _props.order;
    var onUpload = _props.onUpload;

    var images = image.files;
    var formData = new FormData();

    formData.append('order_id', order.id);
    formData.append('album_id', index);
    formData.append('album_name', image.name);

    images.map(function (image) {
      formData.append('images', image);
    });

    (0, _actions.uploadImages)(formData, function () {
      return onUpload(image.id);
    });
  };

  UploadFilesHandler.prototype.handleNameChange = function handleNameChange(e) {
    var image = this.props.image;


    image.name = e.target.value;
  };

  UploadFilesHandler.prototype.onImageAdd = function onImageAdd(images) {
    var _props2 = this.props;
    var image = _props2.image;
    var onDrop = _props2.onDrop;

    var albumId = image.id;
    onDrop(images, albumId);
  };

  UploadFilesHandler.prototype.onImageRemove = function onImageRemove(e, file) {
    e.stopPropagation();
    var _props3 = this.props;
    var image = _props3.image;
    var onRemove = _props3.onRemove;

    var albumId = image.id;
    onRemove(image, albumId);
  };

  UploadFilesHandler.prototype.onAlbumRemove = function onAlbumRemove() {
    var _props4 = this.props;
    var image = _props4.image;
    var onRemoveAlbum = _props4.onRemoveAlbum;

    var albumId = image.id;
    onRemoveAlbum(albumId);
  };

  UploadFilesHandler.prototype.render = function render() {
    var acceptFiles = 'image/jpeg, image/png, .ai';

    var _props5 = this.props;
    var onRemove = _props5.onRemove;
    var image = _props5.image;
    var index = _props5.index;


    return _react2.default.createElement(_upload_files2.default, {
      onDrop: this.onImageAdd,
      accept: acceptFiles,
      onRemove: this.onImageRemove,
      onAlbumRemove: this.onAlbumRemove,
      uploadImage: this.handleSubmit,
      index: index,
      albumName: image.name,
      handleNameChange: this.handleNameChange
    });
  };

  return UploadFilesHandler;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var index = ownProps.index;


  return {
    order: store.order,
    image: store.image[index]
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  var index = ownProps.index;


  return {
    onDrop: function onDrop(images) {
      dispatch((0, _actions.setImages)(images, index));
    },

    onRemove: function onRemove(image) {
      dispatch((0, _actions.removeImage)(image, index));
    },

    onRemoveAlbum: function onRemoveAlbum() {
      dispatch((0, _actions.removeAlbum)(index));
    },

    onUpload: function onUpload() {
      dispatch((0, _actions.setImageUploaded)(index));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadFilesHandler);
//# sourceMappingURL=upload_files.js.map