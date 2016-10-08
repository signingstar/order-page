import React from "react"
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'

import Products from "../containers/product_list"
import InitiateOrder from "../containers/initiate_order"
import CreateOrder from "../containers/create_order"
import ProcessOrder from "../containers/process_order"
import ConfirmOrder from "../containers/confirm_order"
import SubmitOrder from "./submit_order"

const App = () => (
    <div className='main-section-content'>
      <Match exactly pattern="/order" component={InitiateOrder} />
      <Match pattern="/order/products" component={Products} />
      <Match pattern="/order/create" component={CreateOrder} />
      <Match pattern="/order/process" component={ProcessOrder} />
      <Match pattern="/order/confirm" component={ConfirmOrder} />
      <Match pattern="/order/submit" component={SubmitOrder} />
      <Miss component={()=> <div>Not Found</div>} />
    </div>
)

export default App
