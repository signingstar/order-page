import React from "react";

const TextInputComponent = ({label, value, onChange}) => {
  return (
    <div className='inner-section' id='print-others'>
      <label>{label}</label>
      <input type='text' className='text-input' value={value} onChange={onChange} />
    </div>
  );
}

export default TextInputComponent;
