import React from "react";

import ConfirmationButton from "./button";
import FilesPreviewContainer from "../containers/files_preview";
import ContentItem from "./content_item";

const ConfirmationContent = ({fieldsMap, filesNode, onReset, isComplete, isEmpty, onSubmit, itemNodes}) => {
  return (
    <div className='right-panel-content'>
      <form method='post' action='/checkout'>
        <div className='confirmation-content'>
          <div className={isEmpty ? 'hide clear' : 'clear'}>
            <span onClick={onReset}>clear</span>
          </div>
          <div className='header'>
            <h4>Order Summary </h4>
          </div>
          <ul className='order-summary'>
            {itemNodes}
            <ContentItem label='Estimated Price' value={isComplete ? 'Rs. 1000' : ''} />
            <li className='upload-list'>
              <span className='label'>Uploaded Design: </span>
              <span><FilesPreviewContainer /></span>
            </li>
          </ul>
        </div>
      </form>
      <ConfirmationButton onSubmit={onSubmit} isComplete={isComplete} fields={fieldsMap} />
    </div>
  );
}

export default ConfirmationContent;
