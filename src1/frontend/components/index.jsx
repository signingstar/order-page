import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from "../store";
import routes from "../routes";

let preloadedState = window.__PRELOADED_STATE__;

const restoreFromSessionStorage = () => {
  let sessionStoreStr = sessionStorage.getItem('orderApp');
  if((!preloadedState || Object.keys(preloadedState.selectionState).length < 3) && sessionStoreStr) {
    const sessionStore = JSON.parse(sessionStoreStr);
    const { category } = preloadedState.categoryState;
    const sessionCategory = sessionStore.categoryState.category;
    const shouldRestoreSessionStore = category ? category === sessionCategory : false;

    preloadedState =  shouldRestoreSessionStore ? sessionStore : preloadedState;
  }
}

restoreFromSessionStorage();

const rootElem = document.getElementById('main-contents');
const store = configureStore(browserHistory, preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

const renderDom = () => render(<Provider store={store} ><Router routes={routes} history={history} /></Provider>, rootElem);

renderDom();
store.subscribe(renderDom);
