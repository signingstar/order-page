import React from "react"
import { TransitionMotion } from "react-motion"

const FinalizeSelection = ({images, handleChange, willEnter, willLeave, getStyles, getDefaultStyles, value, handleSelect, selected}) => {
  const styles = getStyles()

  return (
    <div className='finalize-page'>
      <h3>Total Images: {styles.length}</h3>
      <div className='filters fields'>
        <div className='field'>
          <input
            className='large-field'
            autoFocus={true}
            placeholder='Start typing to filter by Name or Email Address'
            value={value}
            onChange={handleChange}
          />
        </div>
        {/* <Select
          name='status'
          options={statusList}
          onChange={handleSelect}
          className='status'
          value={selected}
          searchable={false}
          clearable={false}
        /> */}
      </div>
      <TransitionMotion
        defaultStyles={getDefaultStyles()}
        styles={styles}
        willLeave={willLeave}
        willEnter={willEnter}
      >
        {styles =>
          <ul className='order-list'>
            {styles.map(({key, style, data: {originalname}}) =>
              <li key={key} style={style} className='order-entry'>
                <div className='order-entry-item name'><span>{originalname}</span></div>
              </li>
            )}
          </ul>
        }
      </TransitionMotion>
    </div>
  )
}

export default FinalizeSelection
