import React from "react";
import { connect } from "react-redux";
import { ajax } from "jquery";

import ConfirmationContent from "../components/contents";
import { resetAll } from "../../frontend/actions/index";
import ContentItem from "../components/content_item";

const confirmOrder = (fieldsMap, orderApp, isComplete) => {
  if(!isComplete) return false;

  let keys = fieldsKeyMap(fieldsMap);
  let formData = new FormData();
  let { selectionState, categoryState } = orderApp;

  for (let key of keys) {
    formData.append(key, selectionState[key]);
  }

  formData.append('category', categoryState.category);
  let {files} = selectionState;

  if(files && files.length) {
    formData.append('photo', files[0]);
  }

  ajax({
    url: '/order',
    type: 'POST',
    processData: false,
    contentType: false,
    data: formData,
    success: (data) => {
      window.location.href = data.successUrl;
    },
    error: (xhr, status, err) => {
      alert(err.message);
    }
  });

}

const fieldsKeyMap = (fieldsMap) => {
  return fieldsMap.keys();
}

const getItemNodes = (fieldsMap, fieldsKeyMap) => {
  let itemNodes = [];

  for (let key of fieldsKeyMap) {
    itemNodes.push(
      <ContentItem
        label={fieldsMap.get(key).label}
        value={fieldsMap.get(key).value}
        key={key} />
    );
  }

  return itemNodes;
}

const itemCompletetionStatus = (fieldsMap) => {
  let isComplete = true;
  let isEmpty = true;
  let keys = fieldsKeyMap(fieldsMap);

  for (let key of keys) {
    if(!fieldsMap.get(key).value) {
      isComplete = false;
    } else {
      isEmpty = false;
    }
  }

  return { isComplete, isEmpty };
}

const mapStateToProps = (orderApp, ownProps) => {
  let { files = [] } = orderApp.selectionState;
  let { category, fieldsMap } = ownProps.fieldsLabel;

  let { isComplete, isEmpty } = itemCompletetionStatus(fieldsMap);

  const filesNode = files.map(file =>
    <li className='file-name' key={file.name}>{file.name}</li>
  );

  let fieldsKey = fieldsKeyMap(fieldsMap);
  let itemNodes = getItemNodes(fieldsMap, fieldsKey);

  return { fieldsMap, filesNode, isComplete, isEmpty, itemNodes, onSubmit: ()=>confirmOrder(fieldsMap, orderApp, isComplete) }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReset: () => {
      dispatch(resetAll())
    }
  }
};

const Confirmation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationContent);

export default Confirmation;
