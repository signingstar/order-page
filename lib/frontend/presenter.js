"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./actions/index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrderPresenter = function () {
  function OrderPresenter(data) {
    _classCallCheck(this, OrderPresenter);

    this.data = data;
  }

  _createClass(OrderPresenter, [{
    key: "fetchSpecificCategory",
    value: function fetchSpecificCategory(type) {
      if (!this.data[type]) {
        console.log("no data for type:" + type);return;
      };
      return this.data[type];
    }
  }, {
    key: "fetchSpecificFilterByCategory",
    value: function fetchSpecificFilterByCategory(filtercategory, filterValue, category) {
      return this.fetchSpecificCategory(filtercategory)[filterValue][category];
    }
  }, {
    key: "fetchSpecificCategoryAndId",
    value: function fetchSpecificCategoryAndId(type, id) {
      var innerSet = this.fetchSpecificCategory(type);
      if (!innerSet[id]) {
        console.log("no data for filters:" + id);return;
      };

      return innerSet[id];
    }
  }, {
    key: "fetchLabelForCategoryAndId",
    value: function fetchLabelForCategoryAndId(type, id) {
      if (id) {
        return this.fetchSpecificCategoryAndId(type, id).label;
      }
    }
  }, {
    key: "printableData",
    value: function printableData(type) {
      var innerSet = this.fetchSpecificCategory(type);

      var innerList = [];

      for (var key in innerSet) {
        innerList.push({ id: key, value: innerSet[key].label });
      }

      return innerList;
    }
  }, {
    key: "consolidateList",
    value: function consolidateList(sourceList, lookupList) {
      if (sourceList && lookupList) {
        sourceList.forEach(function (item, index) {
          if (lookupList.indexOf(item) === -1) {
            sourceList.splice(index, 1);
          }
        });
      }

      return sourceList;
    }
  }, {
    key: "printableDataWithFilter",
    value: function printableDataWithFilter(filter) {
      var filterTypes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var innerSet = this.fetchSpecificCategory(filter);
      var listForCategory = void 0;
      var category = filterTypes.category;
      var size = filterTypes.size;
      var material = filterTypes.material;
      var coat = filterTypes.coat;
      var fold = filterTypes.fold;
      var paperQuality = filterTypes.paperQuality;

      // console.log(`category:${category} | filterTypes:${JSON.stringify(filterTypes)}`);

      if (category) {
        listForCategory = this.fetchSpecificFilterByCategory(_index.CATEGORY, category, filter).slice();
      }

      if (size) {
        var localList = this.fetchSpecificFilterByCategory(_index.SIZE, size, filter);
        listForCategory = this.consolidateList(listForCategory, localList);
      }

      if (material) {
        var _localList = this.fetchSpecificFilterByCategory(_index.SURFACE, material, filter);
        listForCategory = this.consolidateList(listForCategory, _localList);
      }

      if (coat) {
        var _localList2 = this.fetchSpecificFilterByCategory(_index.COATING, material, filter);
        listForCategory = this.consolidateList(listForCategory, _localList2);
      }

      if (fold) {
        var _localList3 = this.fetchSpecificFilterByCategory(_index.FOLD, material, filter);
        listForCategory = this.consolidateList(listForCategory, _localList3);
      }

      if (paperQuality) {
        var _localList4 = this.fetchSpecificFilterByCategory(_index.PAPER_QUALITY, material, filter);
        listForCategory = this.consolidateList(listForCategory, _localList4);
      }

      var innerList = [];

      for (var key in innerSet) {
        if (!listForCategory || listForCategory.indexOf(key) > -1) {
          innerList.push({ id: key, value: innerSet[key].label });
        }
      }

      return innerList;
    }
  }]);

  return OrderPresenter;
}();

exports.default = OrderPresenter;