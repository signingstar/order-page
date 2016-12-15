"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _images_liked_header = require("./images_liked_header");

var _images_liked_header2 = _interopRequireDefault(_images_liked_header);

var _images_liked = require("./images_liked");

var _images_liked2 = _interopRequireDefault(_images_liked);

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagesLikedByPersonConfiguration = function (_Component) {
  _inherits(ImagesLikedByPersonConfiguration, _Component);

  function ImagesLikedByPersonConfiguration() {
    _classCallCheck(this, ImagesLikedByPersonConfiguration);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      filter: _actions.LIKE,
      view: 'thumbnail'
    };

    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.updateView = _this.updateView.bind(_this);
    return _this;
  }

  ImagesLikedByPersonConfiguration.prototype.updateFilter = function updateFilter(filter) {
    this.setState({
      filter: filter
    });
  };

  ImagesLikedByPersonConfiguration.prototype.updateView = function updateView(view) {
    this.setState({
      view: view
    });
  };

  ImagesLikedByPersonConfiguration.prototype.updateUser = function updateUser(user) {
    this.setState({
      user: user
    });
  };

  ImagesLikedByPersonConfiguration.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "images-by-reaction" },
      _react2.default.createElement(_images_liked_header2.default, {
        filter: this.state.filter,
        updateFilter: this.updateFilter,
        previewMode: this.state.view,
        updatePreviewMode: this.updateView,
        user: this.state.user
      }),
      _react2.default.createElement(_images_liked2.default, { filter: this.state.filter, user: this.state.user, previewMode: this.state.view, pathname: this.props.pathname })
    );
  };

  return ImagesLikedByPersonConfiguration;
}(_react.Component);

exports.default = ImagesLikedByPersonConfiguration;
//# sourceMappingURL=images_liked_by_person.js.map