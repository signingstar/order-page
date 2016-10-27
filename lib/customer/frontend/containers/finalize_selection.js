"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactMotion = require("react-motion");

var _finalize_selection = require("../components/finalize_selection");

var _finalize_selection2 = _interopRequireDefault(_finalize_selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinalizeSelection = function (_Component) {
  _inherits(FinalizeSelection, _Component);

  function FinalizeSelection() {
    _classCallCheck(this, FinalizeSelection);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.getDefaultStyles = _this.getDefaultStyles.bind(_this);
    _this.getStyles = _this.getStyles.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);

    _this.state = {
      value: '',
      selected: 'all'
    };
    return _this;
  }

  FinalizeSelection.prototype.handleChange = function handleChange(_ref) {
    var value = _ref.target.value;

    this.setState({ value: value });
  };

  FinalizeSelection.prototype.handleSelect = function handleSelect(e) {
    this.setState({ selected: e.value });
  };

  // actual animation-related logic


  FinalizeSelection.prototype.getDefaultStyles = function getDefaultStyles() {
    var images = this.props.images;

    return images.map(function (image) {
      return { data: image, key: image.id, style: { height: 0, opacity: 1 } };
    });
  };

  FinalizeSelection.prototype.getStyles = function getStyles() {
    var images = this.props.images;
    var _state = this.state,
        value = _state.value,
        selected = _state.selected;

    return images.filter(function (_ref2) {
      var filename = _ref2.filename;

      return filename !== undefined;
    }).map(function (image, i) {
      return {
        data: image,
        key: image.id,
        style: {
          height: (0, _reactMotion.spring)(50, _reactMotion.presets.gentle),
          opacity: (0, _reactMotion.spring)(1, _reactMotion.presets.gentle)
        }
      };
    });
  };

  FinalizeSelection.prototype.willEnter = function willEnter() {
    return {
      height: 0,
      opacity: 1
    };
  };

  FinalizeSelection.prototype.willLeave = function willLeave() {
    return {
      height: (0, _reactMotion.spring)(0),
      opacity: (0, _reactMotion.spring)(0)
    };
  };

  FinalizeSelection.prototype.render = function render() {
    var images = this.props.images;


    return _react2.default.createElement(_finalize_selection2.default, {
      images: images,
      handleChange: this.handleChange,
      willEnter: this.willEnter,
      willLeave: this.willLeave,
      getStyles: this.getStyles,
      getDefaultStyles: this.getDefaultStyles,
      value: this.state.value,
      handleSelect: this.handleSelect,
      selected: this.state.selected
    });
  };

  return FinalizeSelection;
}(_react.Component);

var mapStateToProps = function mapStateToProps(store) {
  var images = store.images;

  var imageList = [];

  for (var album in images) {
    imageList = imageList.concat(images[album].files);
  }

  return {
    images: imageList
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FinalizeSelection);
//# sourceMappingURL=finalize_selection.js.map