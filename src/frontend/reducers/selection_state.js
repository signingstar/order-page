import * as Action_Items from "../actions/index";
let { RESET, SET_CATEGORY, SET_SIZE, SET_SURFACE, SET_COATING, SET_PAPER_QUALITY, SET_FOLD, SET_QUANTITY, SET_FILES } = Action_Items;
let { SIZE, SURFACE, COATING, PAPER_QUALITY, FOLD, QUANTITY, FILES } = Action_Items;

const defaultState = {
  files: [],
  updateComponents: []
}

const selectionState = (state = defaultState, action) => {
  let {type, value} = action;
  let newState;

  switch (type) {
    case RESET:
    case SET_CATEGORY:
      return {files: [],  updateComponents: [SIZE, SURFACE, COATING, PAPER_QUALITY, FOLD, QUANTITY, FILES]};
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
      newState =  Object.assign({}, state, {
        quantity: value,
        updateComponents: [QUANTITY]
      });
      break;
    case SET_FILES:
      newState =  Object.assign({}, state, {
        files: value,
        updateComponents: [FILES]
      });
      break;
    default:
      return state;
  }

  return newState;
}

export default selectionState;
