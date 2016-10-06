"use strict";

exports.__esModule = true;
exports.filterAndValidateOrderData = undefined;

var _form_validator = require("./form_validator");

var _modules = require("../modules");

var filterAndValidateOrderData = exports.filterAndValidateOrderData = function filterAndValidateOrderData(bodyContent, cb) {
  var category = bodyContent.category;
  var cust_name = bodyContent.cust_name;
  var cust_email = bodyContent.cust_email;
  var image_count = bodyContent.image_count;

  var _validateOrderData = validateOrderData({ category: category, cust_name: cust_name, cust_email: cust_email, image_count: image_count });

  var err = _validateOrderData.err;
  var formData = _validateOrderData.formData;


  if (err) {
    return { err: err };
  }

  return { formData: [category, cust_name, cust_email, image_count] };
};
//# sourceMappingURL=filter_validate.js.map