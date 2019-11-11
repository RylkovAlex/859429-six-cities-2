import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import {BrowserRouter} from 'react-router-dom';
import appReducer from './redux/reducers/app-reducer.js';

const store = createStore(appReducer);

const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById(`root`));
