"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

var _Link = require("react-router-dom/Link");

var _Link2 = _interopRequireDefault(_Link);

var _finalize_filters = require("./finalize_filters");

var _finalize_filters2 = _interopRequireDefault(_finalize_filters);

var _actions = require("../../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FinalizeSelection = function FinalizeSelection(_ref) {
  var filter = _ref.filter,
      pathname = _ref.pathname,
      handleChange = _ref.handleChange,
      willEnter = _ref.willEnter,
      willLeave = _ref.willLeave,
      getStyles = _ref.getStyles,
      getDefaultStyles = _ref.getDefaultStyles,
      value = _ref.value,
      updateFilter = _ref.updateFilter,
      totalCount = _ref.totalCount,
      qualifiedCount = _ref.qualifiedCount,
      qualifyImage = _ref.qualifyImage,
      unqualifyImage = _ref.unqualifyImage,
      handleModeChange = _ref.handleModeChange,
      viewMode = _ref.viewMode,
      finalizeOrder = _ref.finalizeOrder;

  var styles = getStyles();

  return _react2.default.createElement(
    "div",
    { className: "finalize-page extra-margin" },
    _react2.default.createElement(_finalize_filters2.default, {
      filter: filter,
      updateFilter: updateFilter,
      totalCount: totalCount,
      qualifiedCount: qualifiedCount,
      viewMode: viewMode,
      handleModeChange: handleModeChange,
      finalizeOrder: finalizeOrder
    }),
    _react2.default.createElement(
      _reactMotion.TransitionMotion,
      {
        defaultStyles: getDefaultStyles(),
        styles: styles,
        willLeave: willLeave,
        willEnter: willEnter
      },
      function (styles) {
        return _react2.default.createElement(
          "ul",
          { className: "filtered-list" },
          styles.map(function (_ref2, index) {
            var key = _ref2.key,
                style = _ref2.style,
                _ref2$data = _ref2.data,
                imageId = _ref2$data.imageId,
                album_id = _ref2$data.album_id,
                originalname = _ref2$data.originalname,
                score = _ref2$data.score,
                filter = _ref2$data.filter,
                srcSet = _ref2$data.srcSet,
                albumName = _ref2$data.albumName;
            return _react2.default.createElement(
              "li",
              { key: key, style: Object.assign(style, { backgroundColor: "#fff" }), className: "filtered-item" },
              viewMode === 'thumbnail' ? _react2.default.createElement(
                "div",
                { className: "order-entry-item image" },
                _react2.default.createElement(
                  _Link2.default,
                  { to: {
                      pathname: "/order/abc/148/" + imageId,
                      state: { originalUrl: pathname, from: 'finalize' }
                    }
                  },
                  _react2.default.createElement("img", { src: srcSet.thumbnail ? "/" + srcSet.thumbnail : "/" + JSON.parse(srcSet).thumbnail })
                )
              ) : '',
              _react2.default.createElement(
                "div",
                { className: "order-entry-item file-name" },
                _react2.default.createElement(
                  "span",
                  null,
                  originalname
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "order-entry-item album-name" },
                _react2.default.createElement(
                  "span",
                  null,
                  albumName
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "order-entry-item score" },
                _react2.default.createElement(
                  "span",
                  null,
                  score || 0
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "order-entry-item action" },
                filter === _actions.QUALIFIED ? _react2.default.createElement(
                  "button",
                  { className: "glyph", type: "button", onClick: unqualifyImage.bind(null, imageId, album_id) },
                  _react2.default.createElement("span", { className: "glyphicon glyphicon-minus icon", style: { color: '#8B4513' } })
                ) : '',
                filter === _actions.UNQUALIFIED ? _react2.default.createElement(
                  "button",
                  { className: "glyph", type: "button", onClick: qualifyImage.bind(null, imageId, album_id) },
                  _react2.default.createElement("span", { className: "glyphicon glyphicon-ok icon", style: { color: '#8B4513' } })
                ) : ''
              )
            );
          })
        );
      }
    )
  );
};

exports.default = FinalizeSelection;