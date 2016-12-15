import React from "react"
import Select from "react-select"

const AddUser = ({onSelect, role, roleNodes}) => {
  let emailid

  return (
      <div className='fields'>
        <div className='field'>
          <input type='email'
            className='medium-field'
            placeholder='Email Id'
            ref={node => {
              emailid = node
            }}
            autoFocus={true}
          />
        </div>
        <Select
          name='category'
          options={roleNodes}
          onChange={onSelect}
          className='role'
          value={role}
          searchable={false}
          clearable={false}
        />
        <div className='submit-button'>
          <button type='submit'> Add </button>
        </div>
      </div>
  )
}

export default AddUser
