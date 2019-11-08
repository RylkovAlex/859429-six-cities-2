import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {offerCards} from './mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';
import {reviewsMock} from './mocks/reviews.js';
const app = (
  <BrowserRouter>
    <App
      offerCards = {offerCards}
      reviews = {reviewsMock}
    />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById(`root`));
