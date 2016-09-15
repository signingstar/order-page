import { CATEGORY, SIZE, SURFACE, COATING, FOLD, PAPER_QUALITY } from "./actions/index";

class OrderPresenter {
  constructor(data) {
    this.data = data;
  }

  fetchSpecificCategory(type) {
    if(!this.data[type]) { console.log(`no data for type:${type}`);return;};
    return this.data[type];
  }

  fetchSpecificFilterByCategory(filtercategory, filterValue, category) {
    return this.fetchSpecificCategory(filtercategory)[filterValue][category];
  }

  fetchSpecificCategoryAndId(type, id) {
    const innerSet = this.fetchSpecificCategory(type);
    if(!innerSet[id]) { console.log(`no data for filters:${id}`); return;};

    return innerSet[id];
  }

  fetchLabelForCategoryAndId(type, id) {
    if(id) {
      return this.fetchSpecificCategoryAndId(type, id).label;
    }
  }

  printableData(type) {
    const innerSet = this.fetchSpecificCategory(type);

    let innerList = [];

    for(let key in innerSet) {
      innerList.push({id: key, value: innerSet[key].label});
    }

    return innerList;
  }

  consolidateList(sourceList, lookupList) {
    if(sourceList && lookupList){
      sourceList.forEach((item, index) => {
        if(lookupList.indexOf(item) === -1) {
          sourceList.splice(index, 1);
        }
      });
    }

    return sourceList;
  }

  printableDataWithFilter(filter, filterTypes = {}) {
    const innerSet = this.fetchSpecificCategory(filter);
    let listForCategory;
    let {category, size, material, coat, fold, paperQuality} = filterTypes;

    // console.log(`category:${category} | filterTypes:${JSON.stringify(filterTypes)}`);

    if(category) {
      listForCategory = this.fetchSpecificFilterByCategory(CATEGORY, category, filter).slice();
    }

    if(size) {
      let localList = this.fetchSpecificFilterByCategory(SIZE, size, filter);
      listForCategory = this.consolidateList(listForCategory, localList);
    }

    if(material) {
      let localList = this.fetchSpecificFilterByCategory(SURFACE, material, filter);
      listForCategory = this.consolidateList(listForCategory, localList);
    }

    if(coat) {
      let localList = this.fetchSpecificFilterByCategory(COATING, material, filter);
      listForCategory = this.consolidateList(listForCategory, localList);
    }

    if(fold) {
      let localList = this.fetchSpecificFilterByCategory(FOLD, material, filter);
      listForCategory = this.consolidateList(listForCategory, localList);
    }

    if(paperQuality) {
      let localList = this.fetchSpecificFilterByCategory(PAPER_QUALITY, material, filter);
      listForCategory = this.consolidateList(listForCategory, localList);
    }

    let innerList = [];

    for(let key in innerSet) {
      if(!listForCategory || listForCategory.indexOf(key) > -1) {
        innerList.push({id: key, value: innerSet[key].label});
      }
    }

    return innerList;
  }
}

export default OrderPresenter;
