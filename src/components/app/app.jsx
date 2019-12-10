import React, {useEffect} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getOffersToShow} from '../../redux/selectors/selectors.js';
import {Operation} from '../../redux/actions/action-creator/action-creator.js';

import SignIn from '../sign-in/sign-in.jsx';
import Favorites from '../favorrites/favorites.jsx';
import MainWithSortedOffers from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

const App = ({offersToShow, isAppReady, loadOffers, autoLogIn}) => {
  // Если в LocalStorage есть данные пользователя, то сразу выполняю авторизацию - это нужно для корректной работы Roter'a при вводе путей напрямую в адресную строку, а не через клики по навигационным ссылкам.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(`user`));
    if (user) {
      autoLogIn({email: user.email, password: user.password});
    }
  }, []);

  useEffect(() => {
    loadOffers();
  }, []);

  const routes = (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <MainWithSortedOffers offersToSort={offersToShow} />}
      />
      <Route path="/login" exact component={SignIn} />
      <Route path="/offer/:id" exact component={OfferPage} />
      <Route to="/favorites" exact component={Favorites} />
      <Redirect to="/" />
    </Switch>
  );

  return isAppReady ? routes : null;
};

App.propTypes = {
  offersToShow: PropTypes.array.isRequired,
  isAppReady: PropTypes.bool.isRequired,
  loadOffers: PropTypes.func.isRequired,
  autoLogIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isAppReady: state.isAppReady,
    offersToShow: getOffersToShow(state),
  });

const mapDispatchToProps = (dispatch) => ({
  loadOffers: () => dispatch(Operation.loadOffers()),
  autoLogIn: (authData) => dispatch(Operation.sendAuthData(authData)),
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
