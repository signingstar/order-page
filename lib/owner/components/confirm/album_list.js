"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var springConfig = { stiffness: 275, damping: 50 };

var AlbumList = function AlbumList(_ref) {
  var albumList = _ref.albumList,
      handleMouseDown = _ref.handleMouseDown,
      mouse = _ref.mouse,
      isPressed = _ref.isPressed,
      lastPressed = _ref.lastPressed,
      lastPressedIndex = _ref.lastPressedIndex,
      itemHeight = _ref.itemHeight,
      itemSpacing = _ref.itemSpacing;

  var albumLength = albumList.length;

  return _react2.default.createElement(
    "div",
    { className: "album-container", style: { paddingBottom: albumLength * itemSpacing + "px" } },
    _react2.default.createElement(
      "h3",
      null,
      "Upload Summary: "
    ),
    _react2.default.createElement(
      "ul",
      { className: "album-list" },
      albumList.map(function (entry, index) {

        var style = lastPressed === entry && isPressed ? {
          scale: (0, _reactMotion.spring)(1.1, springConfig),
          shadow: (0, _reactMotion.spring)(16, springConfig),
          y: index === lastPressedIndex ? mouse : mouse - (index - lastPressedIndex) * itemHeight
        } : {
          scale: (0, _reactMotion.spring)(1, springConfig),
          shadow: (0, _reactMotion.spring)(1, springConfig),
          y: (0, _reactMotion.spring)(albumList.indexOf(entry) * itemSpacing, springConfig)
        };

        return _react2.default.createElement(
          _reactMotion.Motion,
          { style: style, key: entry.id },
          function (_ref2) {
            var scale = _ref2.scale,
                shadow = _ref2.shadow,
                y = _ref2.y;
            return _react2.default.createElement(
              "li",
              {
                onMouseDown: handleMouseDown.bind(null, entry, y),
                className: "album-entry",
                style: {
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px " + shadow + "px " + 2 * shadow + "px 0px",
                  transform: "translate3d(0, " + y + "px, 0) scale(" + scale + ")",
                  WebkitTransform: "translate3d(0, " + y + "px, 0) scale(" + scale + ")",
                  zIndex: entry === lastPressed ? 98 : index
                } },
              _react2.default.createElement(
                "div",
                { className: "album-summary-item name" },
                "Album: ",
                _react2.default.createElement(
                  "span",
                  null,
                  entry.name
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "album-summary-item count" },
                "Image Count: ",
                _react2.default.createElement(
                  "span",
                  null,
                  entry.count
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "album-summary-item size" },
                "Total Size: ",
                _react2.default.createElement(
                  "span",
                  null,
                  entry.size
                )
              )
            );
          }
        );
      })
    )
  );
};

exports.default = AlbumList;
//# sourceMappingURL=album_list.js.map