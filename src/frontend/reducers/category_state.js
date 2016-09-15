import { SET_CATEGORY, SET_SUB_CATEGORY, SET_ALL_CATEGORY } from "../actions/index";

const categoryState = (state = {}, {type, category, subCategory}) => {
  switch (type) {
    case SET_CATEGORY:
      return Object.assign({}, state, {
        category
      });
      break;
    case SET_SUB_CATEGORY:
      return Object.assign({}, state, {
        subCategory
      });
      break;
    case SET_ALL_CATEGORY:
      return Object.assign({}, state, {
        category,
        subCategory
      });
      break;
    default:
      return state;
  }
}

export default categoryState;
