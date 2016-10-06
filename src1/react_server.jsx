import React from "react";
import { renderToString } from 'react-dom/server'
import { Provider } from "react-redux";
import { RouterContext } from "react-router";

import createStore from "./frontend/store";

const ReactComponent = (renderProps, history) => {
  let {pathname} = renderProps.location;
  const orderPath = /^\/order[\/]?([a-z]+)\-?([a-z0-9\-]*)$/;
  pathname.match(orderPath);

  let category = RegExp.$1;
  let subCategory = RegExp.$2;

  //TODO Add validation
  let initialPayload = {categoryState: {category, subCategory}};

  // Create a new Redux store instance
  const store = createStore(history, initialPayload);

  // Render the component to a string
  const reactHTML = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  return { reactHTML, preloadedState};
}

export default ReactComponent;
