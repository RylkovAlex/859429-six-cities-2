import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import withSortingState from '../hocs/withSortingState/with-sorting-state.js';
import {getOffersToShow} from '../../redux/selectors/selectors.js';
import {Operation} from '../../redux/actions/action-creator/action-creator.js';
import SignIn from '../sign-in/sign-in.jsx';

const MainWithSortedOffers = withSortingState(Main);

const App = ({offersToShow, isAppReady, loadOffers, isAuthorizationRequired}) => {
  useEffect(() => {
    loadOffers();
  }, []);

  if (isAppReady) {
    return (
      <Switch>
        <Route path = "/" exact render = {() => {
          if (isAuthorizationRequired) {
            return <SignIn/>;
          }
          return <MainWithSortedOffers offersToSort = {offersToShow}/>;
        }}/>
        <Route path = "/offer/:id" component = {OfferPage}/>
        <Redirect to = "/"/>
      </Switch>
    );
  }
  return null;
};

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  offersToShow: PropTypes.array.isRequired,
  isAppReady: PropTypes.bool.isRequired,
  loadOffers: PropTypes.func.isRequired,
};

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorizationRequired: state.isAuthorizationRequired,
  isAppReady: state.isAppReady,
  offerCards: state.allOffers,
  offersToShow: getOffersToShow(state),
  reviews: state.reviews,
});

const mapDispatchToProps = (dispath) => ({
  loadOffers: () => dispath(Operation.loadOffers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
