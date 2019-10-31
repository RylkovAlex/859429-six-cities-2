import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {offerCards} from './mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

const app = (
  <BrowserRouter>
    <App
      offerCards = {offerCards}
    />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById(`root`));
