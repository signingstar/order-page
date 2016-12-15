import React from "react"
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

import Home from "../containers/home"
import ImageModal from "../containers/image_modal"

const App = ({pathname}) => (
  <div className='main-section-content'>
    <Match pattern="/order/:usersHash/:orderId" component={Home} />
    <MatchImage pattern="/order/:usersHash/:orderId/:fileName" component={ImageModal} />
  </div>
)

const MatchImage = ({ component:Component, ...rest }) => (
  <Match {...rest}
    render={(matchProps) => {
      const imageId = matchProps.params.fileName

      return (
      imageId.match(/^[a-z0-9]{32}$/) ?
        <Component {...matchProps}/>
      : null
      )
    }}
  />
)

export default App
