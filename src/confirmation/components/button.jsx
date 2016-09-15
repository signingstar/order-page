import React from "react";

const Button = ({isComplete, onSubmit}) => {
  return (
    <div className='checkout-button' id='checkout'>
      <button type='submit' onClick={onSubmit} className={isComplete ? 'active' : 'inactive'} rel='nofollow'>Confirm Order</button>
    </div>
  );
}

export default Button;
