import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import headerPresenter from "tisko-header";

import ReactComponent from "./react_server";
import configureStore from "./frontend/store";
import routes from "./frontend/routes";

let debug = require("debug")('Modules:Order:Controller');

const orderController = function({modules}) {
  let {pug, logger, jsAsset, cssAsset} = modules;
  let srcPath = './modules/order/main.pug';

  return {
    main: function({attributes, responders, page}) {
      let {req, res} = attributes;
      let fn = pug.compileFile(srcPath , {cache: false, pretty: true});
      let {cookies} = req;
      const title = 'Tisko - Place an Order';

      let location = req.url;
      let {category} = req.params;
      const memoryHistory = createMemoryHistory(location);
      const store = configureStore(memoryHistory);
      const history = syncHistoryWithStore(memoryHistory, store);

      headerPresenter({cookies, topNav:true}, page);

      page.set( {
        promotional_header: false,
        javascript: jsAsset('orderjs'),
        stylesheet: cssAsset('ordercss'),
        title,
        body_class: 'order'
      });

      match({routes, location, history}, (error, redirectLocation, renderProps) => {
        if(renderProps) {
          let {reactHTML, preloadedState} = ReactComponent(renderProps, history);
          page.set( {
            reactHTML,
            preloadedState,
          });

          let html = fn(page);

          responders.html(html);
        } else if (redirectLocation) {
          let redirectionPath = redirectLocation.pathname + redirectLocation.search;
          logger.info(`Redirecting to: ${redirectionPath}`);
          res.redirect(302, redirectionPath);
        } else {
          logger.info(`renderProps is not passed`);
          responders.error();
        }
      });
    }
  }
}

export default orderController;
