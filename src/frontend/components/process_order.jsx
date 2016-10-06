import React, {Component} from "react"
import Link from 'react-router/Link'

import UploadFiles from "../containers/upload_files"

const ProcessOrderComponent = ({pathname, onClick}) => (
  <div className='main-section-body'>
    <h2>Upload Files</h2>
    <div className='fields'>
      <UploadFiles />
      <div className='submit-button'>
        <Link to='/order' className='submit-button'>Back</Link>
        <input type='button' onClick={onClick} value='Next' />
      </div>
    </div>
  </div>
)

export default ProcessOrderComponent
