"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../actions/index");

var Action_Items = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RESET = Action_Items.RESET;
var SET_CATEGORY = Action_Items.SET_CATEGORY;
var SET_SIZE = Action_Items.SET_SIZE;
var SET_SURFACE = Action_Items.SET_SURFACE;
var SET_COATING = Action_Items.SET_COATING;
var SET_PAPER_QUALITY = Action_Items.SET_PAPER_QUALITY;
var SET_FOLD = Action_Items.SET_FOLD;
var SET_QUANTITY = Action_Items.SET_QUANTITY;
var SET_FILES = Action_Items.SET_FILES;
var SIZE = Action_Items.SIZE;
var SURFACE = Action_Items.SURFACE;
var COATING = Action_Items.COATING;
var PAPER_QUALITY = Action_Items.PAPER_QUALITY;
var FOLD = Action_Items.FOLD;
var QUANTITY = Action_Items.QUANTITY;
var FILES = Action_Items.FILES;


var defaultState = {
  files: [],
  updateComponents: []
};

var selectionState = function selectionState() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
  var action = arguments[1];
  var type = action.type;
  var value = action.value;

  var newState = void 0;

  switch (type) {
    case RESET:
    case SET_CATEGORY:
      return { files: [], updateComponents: [SIZE, SURFACE, COATING, PAPER_QUALITY, FOLD, QUANTITY, FILES] };
    case SET_SIZE:
      newState = Object.assign({}, state, {
        size: value,
        updateComponents: [SIZE]
      });
      break;
    case SET_SURFACE:
      newState = Object.assign({}, state, {
        material: value,
        coat: undefined,
        updateComponents: [SURFACE, COATING]
      });
      break;
    case SET_COATING:
      newState = Object.assign({}, state, {
        coat: value,
        updateComponents: [COATING]
      });
      break;
    case SET_PAPER_QUALITY:
      newState = Object.assign({}, state, {
        paper_quality: value,
        updateComponents: [PAPER_QUALITY]
      });
      break;
    case SET_FOLD:
      newState = Object.assign({}, state, {
        fold: value,
        updateComponents: [FOLD]
      });
      break;
    case SET_QUANTITY:
      newState = Object.assign({}, state, {
        quantity: value,
        updateComponents: [QUANTITY]
      });
      break;
    case SET_FILES:
      newState = Object.assign({}, state, {
        files: value,
        updateComponents: [FILES]
      });
      break;
    default:
      return state;
  }

  return newState;
};

exports.default = selectionState;