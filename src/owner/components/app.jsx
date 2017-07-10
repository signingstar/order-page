import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import Products from "../containers/product_list"
import InitiateOrder from "../containers/initiate_order"
import ProcessOrder from "../containers/process_order"
import ConfirmOrder from "../containers/confirm/confirm_order"
import SubmitOrder from "./submit_order"
import ViewOrder from "../containers/order_page/order_view"

const App = () => (
    <Switch>
      <div className='main-section-content'>
        <Route exact path="/orders/:orderId" component={ViewOrder} />
        <Route exact path="/order" component={InitiateOrder} />
        <Route exact path="/order/products" component={Products} />
        <Route exact path="/order/process" component={ProcessOrder} />
        <Route path="/order/confirm" component={ConfirmOrder} />
        <Route path="/order/submit" component={SubmitOrder} />
        <Route component={()=> <div>Not Found</div>} />
      </div>
    </Switch>
)

export default App
