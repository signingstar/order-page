import React from "react"
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

import Home from "../containers/home"

const App = ({pathname}) => (
  <div className='main-section-content'>
    <Match exactly pattern="/order/:usersHash/:orderId" component={Home} />
  </div>
)

export default App
