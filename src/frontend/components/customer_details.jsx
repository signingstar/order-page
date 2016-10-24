import React from "react"

const CustomerDetails = ({onChange, onSubmit, title, data ={}, pathname, message}) => {
  const { cust_name, email, phone_number, image_count } = data

  const hasError = !isEmpty(message)
  const messageClass = 'message ' + (message.success ? 'success' : 'error')
  const messageText = hasError ? 'Please enter the correct Value' : ''
  return (
    <div className='customer-section'>
      <h2>{title}</h2>
      <div className={messageClass}>{messageText}</div>
      <form onSubmit={onSubmit} >
        <div className='form fields'>
          <div className='large-field required'>
            <label htmlFor='cust_name'>Customer Name</label>
            <input
              type='text'
              name='cust_name'
              className={'field ' + (message.first_name || message.last_name ? 'error' : '')}
              defaultValue={cust_name}
              onBlur={onChange}
              required
            />
          </div>
          <div className='large-field required'>
            <label htmlFor='email'>Customer Email Id</label>
            <input
              type='email'
              name='email'
              className={'field ' + (message.email ? 'error' : '')}
              defaultValue={email}
              onBlur={onChange}
              required
            />
          </div>
          <div className='large-field required'>
            <label htmlFor='phone_number'>Phone Number</label>
            <input
              type='tel'
              name='phone_number'
              className={'field ' + (message.phone_number ? 'error' : '')}
              defaultValue={phone_number}
              onBlur={onChange}
              required
            />
          </div>

          <div className='small-field'>
            <label htmlFor='image_count'>Number of Images</label>
            <input
              type='number'
              name='image_count'
              className={'field ' + (message.image_count ? 'error' : '')}
              defaultValue={image_count}
              onBlur={onChange}
            />
          </div>
          <div className='submit-button'>
            <button type='submit'> Next </button>
          </div>
        </div>
      </form>
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
