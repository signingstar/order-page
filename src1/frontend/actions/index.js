export const CATEGORY = 'category';
export const SUB_CATEGORY = 'subCategory';

export const SIZE = 'size';
export const SURFACE = 'material';
export const COATING = 'coat';
export const QUANTITY = 'quantity';
export const FOLD = 'fold';
export const PAPER_QUALITY = 'paper_quality';
export const FILES = 'files';
export const TEMPLATE = 'template';

//Action Types
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SUB_CATEGORY = 'SET_SUB_CATEGORY';
export const SET_ALL_CATEGORY = 'SET_ALL_CATEGORY';

export const RESET = 'RESET';
export const SET_SIZE = 'SET_SIZE';
export const SET_SURFACE = 'SET_SURFACE';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_FILES = 'SET_FILES';
export const SET_COATING = 'SET_COATING';
export const SET_FOLD = 'SET_FOLD';
export const SET_PAPER_QUALITY = 'SET_PAPER_QUALITY';
export const SET_FIELD = 'SET_FIELD';
export const SET_TEMPLATE = 'SET_TEMPLATE';

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category
  };
}

export const setSubCategory = (subCategory) => {
  return {
    type: SET_SUB_CATEGORY,
    subCategory
  };
}

export const setAllCategories = (category, subCategory) => {
  return {
    type: SET_ALL_CATEGORY,
    category,
    subCategory
  };
}

export const resetAll = () => {
  return {
    type: RESET
  };
}

export const setSize = (id) => {
  return {
    type: SET_SIZE,
    value: id
  };
}

export const setSurface = (id) => {
  return {
    type: SET_SURFACE,
    value: id
  };
}

export const setCoating = (id) => {
  return {
    type: SET_COATING,
    value: id
  };
}

export const setQuantity = (id) => {
  return {
    type: SET_QUANTITY,
    value: id
  };
}

export const setFold = (id) => {
  return {
    type: SET_FOLD,
    value: id
  };
}

export const setFiles = (files) => {
  return {
    type: SET_FILES,
    value: files
  };
}

export const setPaperQuality = (quality) => {
  return {
    type: SET_PAPER_QUALITY,
    value: quality
  };
}

export const setTemplate = (template) => {
  return {
    type: SET_TEMPLATE,
    value: template
  };
}

export const updateCategories = (category) => {
  return {
    type: UPDATE_CATEGORIES,
    category
  }
}

export const setField = (category, label, value) => {
  return {
    type: SET_FIELD,
    category,
    label,
    value
  }
}
