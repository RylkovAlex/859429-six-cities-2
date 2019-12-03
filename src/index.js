import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import {Router} from 'react-router-dom';
import appReducer from './redux/reducers/app-reducer.js';
import {createAPI} from './api/api.js';
import history from './browser-history/browser-history.js';

const onLoginFail = () => {
  history.push(`/login`);
};
const api = createAPI(onLoginFail, (...args) => store.dispatch(...args));

const composeEnhancers =
  typeof window === `object` &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api))
    // other store enhancers if any
);

const store = createStore(appReducer, enhancer);

const app = (
  <Provider store = {store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById(`root`));
