import React from "react";

const CheckBoxComponent = ({label, checked, onChange}) => {
  return (
    <div className='inner-section' id='print-others'>
      <label>{label}</label>
      <input type='checkbox' className='checkbox-input' checked={checked} onChange={onChange} />
    </div>
  );
}

export default CheckBoxComponent;
