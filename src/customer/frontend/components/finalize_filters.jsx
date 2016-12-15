import React from "react"

import { ALL, QUALIFIED, UNQUALIFIED } from "../actions"
import PreviewModes from "./preview_modes"

const FinalizeFilters = ({filter, updateFilter, totalCount, qualifiedCount, viewMode, handleModeChange}) => {
  const allClass = 'glyph filter all' + ( filter === ALL ? ' selected' : '')
  const qualifiedClass = 'glyph filter qualified' + ( filter === QUALIFIED ? ' selected' : '')
  const unqualifiedClass = 'glyph filter unqualified' + ( filter === UNQUALIFIED ? ' selected' : '')


  return (
    <div className='fields'>
      <div className='filters'>
        <button
          type='button'
          onClick={() => updateFilter(ALL)}
          className={allClass}
          title='All Images'
        >
          <span className='glyphicon glyphicon-picture'></span>
          All images ({totalCount})
        </button>
        <button
          type='button'
          onClick={() => updateFilter(QUALIFIED)}
          className={qualifiedClass}
          title='Qualified for further processing'
        >
          <span className='glyphicon glyphicon-ok-circle'></span>
          Selected ({qualifiedCount})
        </button>
        <button
          type='button'
          onClick={() => updateFilter(UNQUALIFIED)}
          className={unqualifiedClass}
          title='Not yet Qualified for further processing'
        >
          <span className='glyphicon glyphicon-exclamation-sign'></span>
          Filtered Out ({totalCount - qualifiedCount})
        </button>
      </div>
      <PreviewModes previewMode={viewMode} updatePreviewMode={handleModeChange} />
    </div>
  )
}

export default FinalizeFilters
