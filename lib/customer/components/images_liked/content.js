"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImagesByReaction = function ImagesByReaction(_ref) {
  var images = _ref.images,
      pathname = _ref.pathname,
      filter = _ref.filter,
      previewMode = _ref.previewMode;

  return previewMode === _actions.THUMBNAIL_VIEW ? _react2.default.createElement(
    "div",
    { className: "image-list thumbnail" },
    images.map(function (_ref2) {
      var id = _ref2.id,
          originalname = _ref2.originalname,
          thumbnail = _ref2.srcSet.thumbnail;
      return _react2.default.createElement(
        "figure",
        { key: id, className: "multi-row" },
        _react2.default.createElement(
          "div",
          { className: "item-tile" },
          _react2.default.createElement(
            "div",
            { className: "item-image" },
            _react2.default.createElement("img", { src: "/" + thumbnail })
          ),
          _react2.default.createElement(
            "figcaption",
            null,
            _react2.default.createElement(
              "div",
              { className: "item-label" },
              originalname
            )
          )
        )
      );
    })
  ) : _react2.default.createElement(
    "ul",
    { className: "image-list thumbnail" },
    images.map(function (_ref3) {
      var id = _ref3.id,
          originalname = _ref3.originalname,
          thumbnail = _ref3.srcSet.thumbnail;
      return _react2.default.createElement(
        "li",
        { key: id },
        originalname
      );
    })
  );
};

exports.default = ImagesByReaction;