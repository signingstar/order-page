import React from "react";
import { Route, IndexRoute, browserHistory } from 'react-router';

import MainContents from "./components/main_contents";
import Category from "./components/categories";
import Stationary from "./print_types/stationary/main";
import VisitingCard from "./print_types/visiting_card/main";
import Broucher from "./print_types/broucher/main";
import Flyers from "./print_types/flyers/main";

const routes = <Route path="/order" component={MainContents}>
  <IndexRoute component={Category} />
  <Route path="/order/envelope" component={Stationary} />
  <Route path="/order/letterhead" component={Stationary} />
  <Route path="/order/notebook" component={Stationary} />
  <Route path="/order/visitingcard" component={VisitingCard} />
  <Route path="/order/broucher" component={Broucher} />
  <Route path="/order/flyers-*" component={Flyers} />
</Route>

export default routes;
