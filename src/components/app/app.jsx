import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

const App = () => {

  return (
    <Switch>
      <Route path = "/" exact component = {Main}/>
      <Route path = "/offer/:id" component = {OfferPage}/>
      <Redirect to = "/"/>
    </Switch>
  );
};

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerCards: state.allOffers,
  reviews: state.reviews,
});

export default connect(mapStateToProps, null)(withRouter(App));
