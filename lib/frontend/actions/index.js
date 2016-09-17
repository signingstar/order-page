'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CATEGORY = exports.CATEGORY = 'category';
var SUB_CATEGORY = exports.SUB_CATEGORY = 'subCategory';

var SIZE = exports.SIZE = 'size';
var SURFACE = exports.SURFACE = 'material';
var COATING = exports.COATING = 'coat';
var QUANTITY = exports.QUANTITY = 'quantity';
var FOLD = exports.FOLD = 'fold';
var PAPER_QUALITY = exports.PAPER_QUALITY = 'paper_quality';
var FILES = exports.FILES = 'files';
var TEMPLATE = exports.TEMPLATE = 'template';

//Action Types
var SET_CATEGORY = exports.SET_CATEGORY = 'SET_CATEGORY';
var SET_SUB_CATEGORY = exports.SET_SUB_CATEGORY = 'SET_SUB_CATEGORY';
var SET_ALL_CATEGORY = exports.SET_ALL_CATEGORY = 'SET_ALL_CATEGORY';

var RESET = exports.RESET = 'RESET';
var SET_SIZE = exports.SET_SIZE = 'SET_SIZE';
var SET_SURFACE = exports.SET_SURFACE = 'SET_SURFACE';
var SET_QUANTITY = exports.SET_QUANTITY = 'SET_QUANTITY';
var SET_FILES = exports.SET_FILES = 'SET_FILES';
var SET_COATING = exports.SET_COATING = 'SET_COATING';
var SET_FOLD = exports.SET_FOLD = 'SET_FOLD';
var SET_PAPER_QUALITY = exports.SET_PAPER_QUALITY = 'SET_PAPER_QUALITY';
var SET_FIELD = exports.SET_FIELD = 'SET_FIELD';
var SET_TEMPLATE = exports.SET_TEMPLATE = 'SET_TEMPLATE';

var setCategory = exports.setCategory = function setCategory(category) {
  return {
    type: SET_CATEGORY,
    category: category
  };
};

var setSubCategory = exports.setSubCategory = function setSubCategory(subCategory) {
  return {
    type: SET_SUB_CATEGORY,
    subCategory: subCategory
  };
};

var setAllCategories = exports.setAllCategories = function setAllCategories(category, subCategory) {
  return {
    type: SET_ALL_CATEGORY,
    category: category,
    subCategory: subCategory
  };
};

var resetAll = exports.resetAll = function resetAll() {
  return {
    type: RESET
  };
};

var setSize = exports.setSize = function setSize(id) {
  return {
    type: SET_SIZE,
    value: id
  };
};

var setSurface = exports.setSurface = function setSurface(id) {
  return {
    type: SET_SURFACE,
    value: id
  };
};

var setCoating = exports.setCoating = function setCoating(id) {
  return {
    type: SET_COATING,
    value: id
  };
};

var setQuantity = exports.setQuantity = function setQuantity(id) {
  return {
    type: SET_QUANTITY,
    value: id
  };
};

var setFold = exports.setFold = function setFold(id) {
  return {
    type: SET_FOLD,
    value: id
  };
};

var setFiles = exports.setFiles = function setFiles(files) {
  return {
    type: SET_FILES,
    value: files
  };
};

var setPaperQuality = exports.setPaperQuality = function setPaperQuality(quality) {
  return {
    type: SET_PAPER_QUALITY,
    value: quality
  };
};

var setTemplate = exports.setTemplate = function setTemplate(template) {
  return {
    type: SET_TEMPLATE,
    value: template
  };
};

var updateCategories = exports.updateCategories = function updateCategories(category) {
  return {
    type: UPDATE_CATEGORIES,
    category: category
  };
};

var setField = exports.setField = function setField(category, label, value) {
  return {
    type: SET_FIELD,
    category: category,
    label: label,
    value: value
  };
};