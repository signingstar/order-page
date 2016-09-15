"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _sub_categories_modal = require("../components/sub_categories_modal");

var _sub_categories_modal2 = _interopRequireDefault(_sub_categories_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubCategoriesModal = function (_React$Component) {
  _inherits(SubCategoriesModal, _React$Component);

  function SubCategoriesModal() {
    _classCallCheck(this, SubCategoriesModal);

    var _this = _possibleConstructorReturn(this, (SubCategoriesModal.__proto__ || Object.getPrototypeOf(SubCategoriesModal)).call(this));

    _this.state = {
      isShowingModal: false
    };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(SubCategoriesModal, [{
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
      var modalHeader = 'Selected to upload';
      var _props = this.props;
      var type = _props.type;
      var label = _props.label;
      var imgSrc = _props.imgSrc;
      var categoryClass = _props.categoryClass;


      return _react2.default.createElement(_sub_categories_modal2.default, {
        onClick: this.handleClick,
        onClose: this.handleClose,
        isShowing: this.state.isShowingModal,
        label: label,
        modalHeader: modalHeader,
        type: type,
        imgSrc: imgSrc,
        categoryClass: categoryClass
      });
    }
  }]);

  return SubCategoriesModal;
}(_react2.default.Component);

exports.default = SubCategoriesModal;