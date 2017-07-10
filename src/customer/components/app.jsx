import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Home from "../containers/home"
import ImageModal from "../containers/image_modal"
import FinalizedOrder from "../containers/finalized_order"

const App = ({pathname}) => (
    <Switch>
      <div className='main-section-content'>
        <Route path="/order/:usersHash/:orderId" component={Home} />
        <MatchImage path="/order/:usersHash/:orderId/:fileName" component={ImageModal} />
        <Route exact path='/order/finalize' component={FinalizedOrder} />
      </div>
    </Switch>
)

const MatchImage = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={(props) => {
      const imageId = props.match.params.fileName

      return (
        imageId.match(/^[a-z0-9]{32}$/) ?
          <Component {...props}/>
        : null
      )
    }}
  />
)

export default App
