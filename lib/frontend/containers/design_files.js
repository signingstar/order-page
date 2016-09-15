"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _design_files_contents = require("../components/design_files_contents");

var _design_files_contents2 = _interopRequireDefault(_design_files_contents);

var _index = require("../actions/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DesignFilesBox = function (_React$Component) {
  _inherits(DesignFilesBox, _React$Component);

  function DesignFilesBox() {
    _classCallCheck(this, DesignFilesBox);

    return _possibleConstructorReturn(this, (DesignFilesBox.__proto__ || Object.getPrototypeOf(DesignFilesBox)).apply(this, arguments));
  }

  _createClass(DesignFilesBox, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.shouldUpdate;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props;
      var files = _props.files;
      var onDrop = _props.onDrop;


      var label = 'Print Design';
      var placeholder = 'Drop your files here, or click anywhere in this box to select files to upload';
      var acceptFiles = 'image/jpeg, image/png, .ai';

      return _react2.default.createElement(_design_files_contents2.default, {
        label: label,
        placeholder: placeholder,
        onDrop: onDrop,
        accept: acceptFiles });
    }
  }]);

  return DesignFilesBox;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(orderApp, ownProps) {
  var _orderApp$selectionSt = orderApp.selectionState;
  var files = _orderApp$selectionSt.files;
  var updateComponents = _orderApp$selectionSt.updateComponents;


  return {
    files: files,
    shouldUpdate: updateComponents.indexOf(_index.FILES) > -1
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDrop: function onDrop(files) {
      return dispatch((0, _index.setFiles)(files));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DesignFilesBox);