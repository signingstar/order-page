import React from "react"

const ImageFeedbackUsers= ({ users }) => {
  const userList = users.map(user => <li key={user}>{user}</li>)

  return (
    <ul className="reactors">
      {userList}
    </ul>
  )
}

export default ImageFeedbackUsers
