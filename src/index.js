import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import {offerCards} from './mocks/offers.js';

const app = (
  <App
    offerCards = {offerCards}
  />
);

ReactDOM.render(app, document.getElementById(`root`));
