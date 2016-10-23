"use strict";

exports.__esModule = true;

var _reactRedux = require("react-redux");

var _image_list = require("../components/image_list");

var _image_list2 = _interopRequireDefault(_image_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var placeholder = 'Drop your image files here...';
  var albumId = ownProps.albumId;

  var album = store.image[albumId];

  return {
    images: store.image[albumId].files || [],
    placeholder: placeholder
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onRemove: function onRemove(e, name) {
      ownProps.onRemove(e, name);
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_image_list2.default);
//# sourceMappingURL=image_list.js.map