import React from "react"
import { TransitionMotion } from "react-motion"

const AlbumDetail = ({album, expanded, handleExpand, willEnter, willLeave, getStyles, getDefaultStyles}) => {
  const arrowClass = `glyphicon icon ${expanded ? 'glyphicon-menu-up' : 'glyphicon-menu-down'}`

  return (
    <li className="album-entry">
      <div className='album-header'>
        <div className='album-summary-item name'><span>{album.name}</span></div>
        <div className='album-summary-item count'>Image Count: <span>{album.count}</span></div>
        <div className='album-summary-item size'>Total Size: <span>{album.size}</span></div>
        <div className='expand'>
          <button type='button' onClick={handleExpand} title='View list of files'>
            <span className={arrowClass}></span>
          </button>
        </div>
      </div>
      {
        expanded ?
          <TransitionMotion
            defaultStyles={getDefaultStyles()}
            styles={getStyles()}
            willLeave={willLeave}
            willEnter={willEnter}
          >
            {styles =>
              <ul className='file-list'>
                {styles.map(({key, style, data: {name}}) =>
                  <li key={key} style={style} className='file-entry'>
                    <div className='file-entry-item status'><span>{name}</span></div>
                  </li>
                )}
              </ul>
            }
          </TransitionMotion>

        : ''
      }
    </li>
  )
}

export default AlbumDetail
