import React from "react"
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

import Products from "../containers/product_list"
import InitiateOrder from "../containers/initiate_order"
import ProcessOrder from "../containers/process_order"
import ConfirmOrder from "../containers/confirm/confirm_order"
import SubmitOrder from "./submit_order"
import ViewOrder from "../containers/order_page/order_view"

const App = () => (
    <div className='main-section-content'>
      <Match exactly pattern="/orders/:orderId" component={ViewOrder} />
      <Match exactly pattern="/order" component={InitiateOrder} />
      <Match exactly pattern="/order/products" component={Products} />
      <Match exactly pattern="/order/process" component={ProcessOrder} />
      <Match pattern="/order/confirm" component={ConfirmOrder} />
      <Match pattern="/order/submit" component={SubmitOrder} />
      <Miss component={()=> <div>Not Found</div>} />
    </div>
)

export default App
