import React from "react"
import { Motion, spring} from "react-motion"

const springConfig = {stiffness: 275, damping: 50}

const AlbumList = ({albumList, handleMouseDown, mouse, isPressed, lastPressed, lastPressedIndex, itemHeight, itemSpacing}) => {
  const albumLength = albumList.length

  return (
    <div className='album-container' style={{paddingBottom: `${albumLength * itemSpacing}px`}}>
      <h3>Upload Summary: </h3>
      <ul className='album-list'>
        {
          albumList.map((entry, index) => {

            const style = lastPressed === entry && isPressed
            ? {
              scale: spring(1.1, springConfig),
              shadow: spring(16, springConfig),
              y: (index === lastPressedIndex ? mouse : mouse - (index - lastPressedIndex) * itemHeight),
            }
            : {
              scale: spring(1, springConfig),
              shadow: spring(1, springConfig),
              y: spring(albumList.indexOf(entry) * itemSpacing, springConfig),
            }

            return (
              <Motion style={style} key={entry.id}>
                {({scale, shadow, y}) =>
                  <li
                    onMouseDown={handleMouseDown.bind(null, entry, y)}
                    className="album-entry"
                    style={{
                      boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                      zIndex: entry === lastPressed ? 99 : index,
                    }}>
                    <div className='album-summary-item name'>Album: <span>{entry.name}</span></div>
                    <div className='album-summary-item count'>Image Count: <span>{entry.count}</span></div>
                    <div className='album-summary-item size'>Total Size: <span>{entry.size}</span></div>
                  </li>
                }
              </Motion>
            )
          })
        }
      </ul>
    </div>
  )
}

export default AlbumList
