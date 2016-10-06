import React, {Component} from "react"
import Link from 'react-router/Link'

const ConfirmOrderComponent = ({pathname, onClick}) => (
  <div className='main-section-body'>
    <h2>Hurry. One last step</h2>
    <div className='fields'>
      <div className='submit-button'>
        <Link to='/order/process' className='submit-button'>Back</Link>
        <input type='button' onClick={onClick} value='Next' />
      </div>
    </div>
  </div>
)

export default ConfirmOrderComponent
