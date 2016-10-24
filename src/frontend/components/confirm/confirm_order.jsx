import React, {Component} from "react"
import Link from 'react-router/Link'
import Select from "react-select"

import AlbumList from "../../containers/confirm/album_list"
import SelectionCriteria from "../../containers/confirm/image_selection_criteria"

const ConfirmOrderComponent = ({pathname, onClick, orderName, onSelect, handleChange, category, optionNodes}) => (
  <div className='main-section-body'>
    <h1>Order Confirmation</h1>
    <div className='fields row'>
      <div className='large-field required'>
        <label htmlFor="orderName">Order Name</label>
        <input type="text" defaultValue={orderName} onChange={handleChange} autoFocus={true} />
      </div>
      <div className='large-field'>
        <label htmlFor='category'>Event Type</label>
        <Select
          name='category'
          options={optionNodes}
          onChange={onSelect}
          className='field '
          value={category}
          searchable={false}
          clearable={false}
        />
      </div>    </div>
    <AlbumList />
    <SelectionCriteria />
    <div className='fields'>
      <div className='action-section'>
        <div className='nav-page row'>
          <div className='button back'>
            <Link to='/order/process' replace={true} className='submit-button'>Back</Link>
          </div>
          <div className='button next'>
            <input type='button' onClick={onClick} value='Confirm' />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ConfirmOrderComponent
