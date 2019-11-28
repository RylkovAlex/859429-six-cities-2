import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import withSortingState from '../hocs/withSortingState/with-sorting-state.js';
import {getOffersToShow} from '../../redux/selectors/selectors.js';

const MainWithSortedOffers = withSortingState(Main);

const App = ({offersToShow}) => {

  return (
    <Switch>
      <Route path = "/" exact render = {() => <MainWithSortedOffers offersToSort = {offersToShow}/>}/>
      <Route path = "/offer/:id" component = {OfferPage}/>
      <Redirect to = "/"/>
    </Switch>
  );
};

App.propTypes = {
  offersToShow: PropTypes.array.isRequired,
};

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerCards: state.allOffers,
  offersToShow: getOffersToShow(state),
  reviews: state.reviews,
});

export default connect(mapStateToProps, null)(withRouter(App));
