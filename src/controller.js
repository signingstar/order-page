import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import path from "path";

import headerPresenter from "tisko-layout";

import ReactComponent from "./react_server";
import configureStore from "./frontend/store";
import routes from "./frontend/routes";

let debug = require("debug")('Modules:Order:Controller');

const controller = ({modules}) => {
  const {pugCompiler, logger, jsAsset, cssAsset} = modules;
  const srcPath = path.join(__dirname, '../', 'main');
  const renderPage = pugCompiler(srcPath);
  const title = 'Tisko - Place an Order';

  return {
    main: ({attributes, responders, page}) => {
      const {req, res} = attributes;
      const {cookies, url:location} = req;
      const memoryHistory = createMemoryHistory(location);
      const store = configureStore(memoryHistory);
      const history = syncHistoryWithStore(memoryHistory, store);

      match({routes, location, history}, (error, redirectLocation, renderProps) => {
        if(renderProps) {
          const {reactHTML, preloadedState} = ReactComponent(renderProps, history);

          headerPresenter({cookies, topNav:true}, page);
          page.set( {
            javascript: jsAsset('orderjs'),
            stylesheet: cssAsset('ordercss'),
            body_class: 'order',
            title,
            reactHTML,
            preloadedState
          });

          const html = renderPage(page);

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

export default controller;
