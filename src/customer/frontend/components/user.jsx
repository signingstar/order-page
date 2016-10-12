import React from "react"

const User = ({ email, role }) => (
  <div className='user-info'>
    <div className='email'>{email}</div>
    <div className='role'>
      {role}
    </div>
  </div>
)

export default User
