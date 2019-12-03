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
import Favorites from '../favorrites/favorites.jsx';

const MainWithSortedOffers = withSortingState(Main);

const App = ({offersToShow, isAppReady, loadOffers}) => {
  useEffect(() => {
    loadOffers();
  }, []);

  const routes = (
    <Switch>
      <Route path = "/" exact render = {() => <MainWithSortedOffers offersToSort = {offersToShow}/>}/>
      <Route path = "/login" exact component = {SignIn}/>
      <Route path = "/offer/:id" exact component = {OfferPage}/>
      <Route to = "/favorites" exact component = {Favorites}/>
      <Redirect to = "/"/>
    </Switch>
  );

  return isAppReady ? routes : null;
};

App.propTypes = {
  offersToShow: PropTypes.array.isRequired,
  isAppReady: PropTypes.bool.isRequired,
  loadOffers: PropTypes.func.isRequired,
};

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAppReady: state.isAppReady,
  offersToShow: getOffersToShow(state),
});

const mapDispatchToProps = (dispath) => ({
  loadOffers: () => dispath(Operation.loadOffers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
