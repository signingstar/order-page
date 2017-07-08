import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Home from "../containers/home"
import ImageModal from "../containers/image_modal"

const App = ({pathname}) => (
  <Router>
    <Switch>
      <div className='main-section-content'>
        <Route path="/orders/:orderId/preview" component={Home} />
        <Route path="/order/:usersHash/:orderId/:fileName" component={ImageModal} />
      </div>
    </Switch>
  </Router>
)

export default App
