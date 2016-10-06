import React from "react"
import Link from 'react-router/Link'
import Select from "react-select"

const CustomerDetails = ({onChange, onClick, onSelect, title, data ={}, pathname, message, optionNodes}) => {
  const { cust_name, email, phone_number, category, image_count } = data

  const hasError = !isEmpty(message)
  const messageClass = 'message ' + (message.success ? 'success' : 'error')
  const messageText = hasError ? 'Please enter the correct Value' : ''
  return (
    <div className='main-section-body'>
      <h2>{title}</h2>
      <div className={messageClass}>{messageText}</div>
      <div className='form fields'>
        <div className='large-field'>
          <label htmlFor='cust_name'>Customer Name</label>
          <input
            type='text'
            name='cust_name'
            className={'field ' + (message.first_name || message.last_name ? 'error' : '')}
            defaultValue={cust_name}
            onBlur={onChange}
          />
        </div>
        <div className='large-field'>
          <label htmlFor='email'>Customer Email Id</label>
          <input
            type='email'
            name='email'
            className={'field ' + (message.email ? 'error' : '')}
            defaultValue={email}
            onBlur={onChange}
          />
        </div>
        <div className='large-field'>
          <label htmlFor='phone_number'>Phone Number</label>
          <input
            type='text'
            name='phone_number'
            className={'field ' + (message.phone_number ? 'error' : '')}
            defaultValue={phone_number}
            onBlur={onChange}
          />
        </div>
        <div className='large-field'>
          <label htmlFor='category'>Event Type</label>
          <Select
            name='category'
            options={optionNodes}
            onChange={onSelect}
            className={'field ' + (message.category ? 'error' : '')}
            value={category}
            searchable={false}
            clearable={false}
          />
        </div>
        <div className='large-field'>
          <label htmlFor='image_count'>Number of images</label>
          <input
            type='text'
            name='image_count'
            className={'field ' + (message.image_count ? 'error' : '')}
            defaultValue={image_count}
            onBlur={onChange}
          />
        </div>
        <div className='submit-button'>
          <Link to={`${pathname}/create`} className='submit-button'>Next</Link>
        </div>
      </div>
    </div>
  )
}

const isEmpty = (obj) => {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop))
      return false
  }

  return true
}

export default CustomerDetails
