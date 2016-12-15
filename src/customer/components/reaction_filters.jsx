import React from "react"
import Select from "react-select"

import { ALL, LIKE, DISLIKE, LOVE } from "../actions"
import PreviewModes from "./preview_modes"

const ReactionFilters = ({filter, updateFilter, totalCount, likedCount, dislikedCount, lovedCount, updatePreviewMode, previewMode, user, onChange, userNodes}) => {
  const allClass = 'glyph filter all' + ( filter === ALL ? ' selected' : '')
  const likedClass = 'glyph filter liked' + ( filter === LIKE ? ' selected' : '')
  const dislikedClass = 'glyph filter disliked' + ( filter === DISLIKE ? ' selected' : '')
  const lovedClass = 'glyph filter loved' + ( filter === LOVE ? ' selected' : '')


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
          All ({totalCount})
        </button>
        <button
          type='button'
          onClick={() => updateFilter(LIKE)}
          className={likedClass}
          title='Images Liked'
        >
          <span className='glyphicon glyphicon-thumbs-up'></span>
          Liked ({likedCount})
        </button>
        <button
          type='button'
          onClick={() => updateFilter(DISLIKE)}
          className={dislikedClass}
          title='Images Disliked'
        >
          <span className='glyphicon glyphicon-thumbs-down'></span>
          Disliked ({dislikedCount})
        </button>
        <button
          type='button'
          onClick={() => updateFilter(LOVE)}
          className={lovedClass}
          title='Images Loved'
        >
          <span className='glyphicon glyphicon-heart'></span>
          Loved ({lovedCount})
        </button>
      </div>
      <Select
        name='category'
        options={userNodes}
        onChange={onChange}
        className='users'
        value={user}
        searchable={false}
        clearable={false}
      />
      <PreviewModes previewMode={previewMode} updatePreviewMode={updatePreviewMode} />
    </div>
  )
}

export default ReactionFilters
