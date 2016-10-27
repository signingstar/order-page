"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require("react-motion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const FinalizeSelection = ({ images }) => {
//   const imageList = images.map(image => (
//     <li key={image.id} className='nav-left'>
//       {image.filename}
//     </li>
//   ))
//
//   return (
//     <div className='finalize-page'>
//       <div className='filters'>
//         filter 1
//       </div>
//       <div className='images'>
//         <ul>
//           <li><div>Image Name</div><div>Qualified</div></li>
//           {imageList}
//         </ul>
//       </div>
//     </div>
//   )
// }

var FinalizeSelection = function FinalizeSelection(_ref) {
  var images = _ref.images,
      handleChange = _ref.handleChange,
      willEnter = _ref.willEnter,
      willLeave = _ref.willLeave,
      getStyles = _ref.getStyles,
      getDefaultStyles = _ref.getDefaultStyles,
      value = _ref.value,
      handleSelect = _ref.handleSelect,
      selected = _ref.selected;

  return _react2.default.createElement(
    "div",
    { className: "finalize-page" },
    _react2.default.createElement(
      "h3",
      null,
      "Total Images: ",
      images.length
    ),
    _react2.default.createElement(
      "div",
      { className: "filters fields" },
      _react2.default.createElement(
        "div",
        { className: "field" },
        _react2.default.createElement("input", {
          className: "large-field",
          autoFocus: true,
          placeholder: "Start typing to filter by Name or Email Address",
          value: value,
          onChange: handleChange
        })
      )
    ),
    _react2.default.createElement(
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
          { className: "order-list" },
          styles.map(function (_ref2) {
            var key = _ref2.key,
                style = _ref2.style,
                originalname = _ref2.data.originalname;
            return _react2.default.createElement(
              "li",
              { key: key, style: style, className: "order-entry" },
              _react2.default.createElement(
                "div",
                { className: "order-entry-item name" },
                _react2.default.createElement(
                  "span",
                  null,
                  originalname
                )
              )
            );
          })
        );
      }
    )
  );
};

exports.default = FinalizeSelection;
//# sourceMappingURL=finalize_selection.js.map