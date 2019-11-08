import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import {offerCards} from './mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';
import {reviewsMock} from './mocks/reviews.js';
import appReducer from './redux/reducers/reducer.js';

const store = createStore(appReducer);

const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App
        offerCards = {offerCards}
        reviews = {reviewsMock}
      />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById(`root`));
