import React from "react"
import { TransitionMotion } from "react-motion"

import FinalizeFilters from "./finalize_filters"
import { ALL, QUALIFIED, UNQUALIFIED } from "../actions"

const FinalizeSelection = ({images, filter, handleChange, willEnter, willLeave, getStyles, getDefaultStyles, value, updateFilter, totalCount, qualifiedCount, qualifyImage, unqualifyImage, handleModeChange, viewMode}) => {
  const styles = getStyles()

  return (
    <div className='finalize-page extra-margin'>
      <FinalizeFilters
        filter={filter}
        updateFilter={updateFilter}
        totalCount={totalCount}
        qualifiedCount={qualifiedCount}
        viewMode={viewMode}
        handleModeChange={handleModeChange}
      />
      <TransitionMotion
        defaultStyles={getDefaultStyles()}
        styles={styles}
        willLeave={willLeave}
        willEnter={willEnter}
      >
        {styles =>
          <ul className='filtered-list'>
            {styles.map(({key, style, data: {id, album_id, originalname, score, filter, srcSet}}, index) =>
              <li key={key} style={Object.assign(style, {backgroundColor: `#fff`})} className='filtered-item'>
                { viewMode === 'thumbnail' ?
                  <div className='order-entry-item image'>
                    <img src={srcSet.thumbnail ? `/${srcSet.thumbnail}` :  `/${JSON.parse(srcSet).thumbnail}`} />
                    {/* TODO: Fix parsing */}
                  </div>
                  : ''
                }

                <div className='order-entry-item name'><span>{originalname}</span></div>
                <div className='order-entry-item score'><span>{score || 0}</span></div>
                <div className='order-entry-item action'>
                  { filter === QUALIFIED ?
                    <button className='glyph' type='button' onClick={unqualifyImage.bind(null, id, album_id)}>
                      <span className='glyphicon glyphicon-minus icon' style={{color: '#8B4513'}}></span>
                    </button>
                    : ''
                  }
                  { filter === UNQUALIFIED ?
                    <button className='glyph' type='button' onClick={qualifyImage.bind(null, id, album_id)}>
                      <span className='glyphicon glyphicon-ok icon' style={{color: '#8B4513'}}></span>
                    </button>
                    : ''
                  }
                </div>
              </li>
            )}
          </ul>
        }
      </TransitionMotion>
    </div>
  )
}

export default FinalizeSelection
