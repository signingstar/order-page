"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _files_preview = require("../components/files_preview");

var _files_preview2 = _interopRequireDefault(_files_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilesPreviewContainer = function (_React$Component) {
  _inherits(FilesPreviewContainer, _React$Component);

  function FilesPreviewContainer() {
    _classCallCheck(this, FilesPreviewContainer);

    var _this = _possibleConstructorReturn(this, (FilesPreviewContainer.__proto__ || Object.getPrototypeOf(FilesPreviewContainer)).call(this));

    _this.state = {
      isShowingModal: false
    };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(FilesPreviewContainer, [{
    key: "handleClick",
    value: function handleClick() {
      this.setState({ isShowingModal: true });
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({ isShowingModal: false });
    }
  }, {
    key: "render",
    value: function render() {
      var files = this.props.files;

      var label = 'See Preview';
      var modalHeader = 'Selected ' + (files.length === 1 ? '1 file' : files.length + ' files') + ' to upload';

      return _react2.default.createElement(_files_preview2.default, {
        onClick: this.handleClick,
        onClose: this.handleClose,
        isShowing: this.state.isShowingModal,
        label: label, files: files,
        modalHeader: modalHeader });
    }
  }]);

  return FilesPreviewContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(orderApp) {
  return {
    files: orderApp.selectionState.files || []
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FilesPreviewContainer);