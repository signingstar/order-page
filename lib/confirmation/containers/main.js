"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _jquery = require("jquery");

var _contents = require("../components/contents");

var _contents2 = _interopRequireDefault(_contents);

var _index = require("../../frontend/actions/index");

var _content_item = require("../components/content_item");

var _content_item2 = _interopRequireDefault(_content_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confirmOrder = function confirmOrder(fieldsMap, orderApp, isComplete) {
  if (!isComplete) return false;

  var keys = fieldsKeyMap(fieldsMap);
  var formData = new FormData();
  var selectionState = orderApp.selectionState;
  var categoryState = orderApp.categoryState;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {

    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      formData.append(key, selectionState[key]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  formData.append('category', categoryState.category);
  var files = selectionState.files;


  if (files && files.length) {
    formData.append('photo', files[0]);
  }

  (0, _jquery.ajax)({
    url: '/order',
    type: 'POST',
    processData: false,
    contentType: false,
    data: formData,
    success: function success(data) {
      window.location.href = data.successUrl;
    },
    error: function error(xhr, status, err) {
      alert(err.message);
    }
  });
};

var fieldsKeyMap = function fieldsKeyMap(fieldsMap) {
  return fieldsMap.keys();
};

var getItemNodes = function getItemNodes(fieldsMap, fieldsKeyMap) {
  var itemNodes = [];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = fieldsKeyMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      itemNodes.push(_react2.default.createElement(_content_item2.default, {
        label: fieldsMap.get(key).label,
        value: fieldsMap.get(key).value,
        key: key }));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return itemNodes;
};

var itemCompletetionStatus = function itemCompletetionStatus(fieldsMap) {
  var isComplete = true;
  var isEmpty = true;
  var keys = fieldsKeyMap(fieldsMap);

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var key = _step3.value;

      if (!fieldsMap.get(key).value) {
        isComplete = false;
      } else {
        isEmpty = false;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return { isComplete: isComplete, isEmpty: isEmpty };
};

var mapStateToProps = function mapStateToProps(orderApp, ownProps) {
  var _orderApp$selectionSt = orderApp.selectionState.files;
  var files = _orderApp$selectionSt === undefined ? [] : _orderApp$selectionSt;
  var _ownProps$fieldsLabel = ownProps.fieldsLabel;
  var category = _ownProps$fieldsLabel.category;
  var fieldsMap = _ownProps$fieldsLabel.fieldsMap;

  var _itemCompletetionStat = itemCompletetionStatus(fieldsMap);

  var isComplete = _itemCompletetionStat.isComplete;
  var isEmpty = _itemCompletetionStat.isEmpty;


  var filesNode = files.map(function (file) {
    return _react2.default.createElement(
      "li",
      { className: "file-name", key: file.name },
      file.name
    );
  });

  var fieldsKey = fieldsKeyMap(fieldsMap);
  var itemNodes = getItemNodes(fieldsMap, fieldsKey);

  return { fieldsMap: fieldsMap, filesNode: filesNode, isComplete: isComplete, isEmpty: isEmpty, itemNodes: itemNodes, onSubmit: function onSubmit() {
      return confirmOrder(fieldsMap, orderApp, isComplete);
    } };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    onReset: function onReset() {
      dispatch((0, _index.resetAll)());
    }
  };
};

var Confirmation = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_contents2.default);

exports.default = Confirmation;