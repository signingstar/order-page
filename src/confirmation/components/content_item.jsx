import React from "react";

const ContentItem = ({label, value}) => {
  return (
    <li>
      <span className='label'>{label}:</span>
      <span>{value}</span>
    </li>
  );
}

export default ContentItem;
