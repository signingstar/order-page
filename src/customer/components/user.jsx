import React from "react"

import { USER_ROLES } from "../actions"

const User = ({ email, role, onDelete }) => (
  <div className='user-info'>
    <div className='email'>{email}</div>
    <div className='role'>
      {USER_ROLES[role].shortDescription}
    </div>
    <div className='submit-button'>
      <input type='button' value='Remove' onClick={onDelete} />
    </div>
  </div>
)

export default User
