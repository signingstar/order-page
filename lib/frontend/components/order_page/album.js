"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlbumDetail = function AlbumDetail(_ref) {
  var album = _ref.album;
  var expanded = _ref.expanded;
  var handleExpand = _ref.handleExpand;
  var willEnter = _ref.willEnter;
  var willLeave = _ref.willLeave;
  var getStyles = _ref.getStyles;
  var getDefaultStyles = _ref.getDefaultStyles;

  var arrowClass = "glyphicon icon " + (expanded ? 'glyphicon-menu-up' : 'glyphicon-menu-down');

  return _react2.default.createElement(
    "li",
    { className: "album-entry" },
    _react2.default.createElement(
      "div",
      { className: "album-header" },
      _react2.default.createElement(
        "div",
        { className: "album-summary-item name" },
        _react2.default.createElement(
          "span",
          null,
          album.name
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "album-summary-item count" },
        "Image Count: ",
        _react2.default.createElement(
          "span",
          null,
          album.count
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "album-summary-item size" },
        "Total Size: ",
        _react2.default.createElement(
          "span",
          null,
          album.size
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "expand" },
        _react2.default.createElement(
          "button",
          { type: "button", onClick: handleExpand, title: "View list of files" },
          _react2.default.createElement("span", { className: arrowClass })
        )
      )
    ),
    expanded ? _react2.default.createElement(
      _reactMotion.TransitionMotion,
      {
        defaultStyles: getDefaultStyles(),
        styles: getStyles(),
        willLeave: willLeave,
        willEnter: willEnter
      },
      function (styles) {
        return _react2.default.createElement(
          "ul",
          { className: "file-list" },
          styles.map(function (_ref2) {
            var key = _ref2.key;
            var style = _ref2.style;
            var name = _ref2.data.name;
            return _react2.default.createElement(
              "li",
              { key: key, style: style, className: "file-entry" },
              _react2.default.createElement(
                "div",
                { className: "file-entry-item status" },
                _react2.default.createElement(
                  "span",
                  null,
                  name
                )
              )
            );
          })
        );
      }
    ) : ''
  );
};

exports.default = AlbumDetail;
//# sourceMappingURL=album.js.map