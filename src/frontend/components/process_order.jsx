import React, {Component} from "react"
import Link from 'react-router/Link'

import UploadFiles from "../containers/upload_files"

const ProcessOrderComponent = ({pathname, onClick, addAlbum, image}) => {
  const keys = Object.keys(image).sort((id1, id2) => image[id1].priority - image[id2].priority )

  return (
    <div className='image-section'>
      <h2>Upload Files</h2>
      <div className='fields'>
        { keys.map(entry => <UploadFiles key={entry} index={entry} />)}
        <div className='action-section'>
          <div className='add-album row'>
            <input type='button' onClick={addAlbum} value='+ Add Another Album' />
          </div>
          <div className='nav-page row'>
            <div className='button back'>
              <Link to='/order' className='submit-button'>Back</Link>
            </div>
            <div className='button next'>
              <input type='button' onClick={onClick} value='Next' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessOrderComponent
