import React from "react"

import { THUMBNAIL_VIEW, LIST_VIEW } from "../actions"

const PreviewModes = ({previewMode, updatePreviewMode}) => (
  <div className='preview-mode'>
    <button
      className={previewMode === LIST_VIEW ? 'selected list' : 'list'}
      type='button'
      onClick={()=> updatePreviewMode(LIST_VIEW)}
      title='List View'>
      <span className='glyphicon glyphicon-list'></span>
    </button>
    <button
      className={previewMode === THUMBNAIL_VIEW ? 'selected thumbnail' : 'thumbnail'}
      type='button'
      onClick={()=> updatePreviewMode(THUMBNAIL_VIEW)}
      title='Thumbnail View'>
      <span className='glyphicon glyphicon-th'></span>
    </button>
  </div>
)

export default PreviewModes
