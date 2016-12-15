import React from "react"
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

import Home from "../containers/home"
import ImageModal from "../containers/image_modal"

const App = ({pathname}) => (
  <div className='main-section-content'>
    <Match pattern="/orders/:orderId/preview" component={Home} />
    <Match pattern="/order/:usersHash/:orderId/:fileName" component={ImageModal} />
  </div>
)

export default App
