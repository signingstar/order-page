import React, {Component} from "react"
import Link from 'react-router-dom/Link'

import UploadFiles from "../containers/upload_files"

const ProcessOrderComponent = ({pathname, onClick, addAlbum, albums}) => {
  const albumIds = Object.keys(albums).sort((id1, id2) => albums[id1].priority - albums[id2].priority )

  return (
    <div className='image-section'>
      <h2>Upload Files</h2>
      <div className='fields'>
        { albumIds.map(albumId => <UploadFiles key={albumId} albumId={albumId} />)}
        <div className='action-section'>
          <div className='add-album row'>
            <input type='button' onClick={addAlbum} value='+ Add Another Album' />
          </div>
          <div className='nav-page row'>
            <div className='button back'>
              <Link to='/order' replace={true} className='submit-button'>Back</Link>
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
