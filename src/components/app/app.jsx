import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';

import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {offerCardPropTypes, reviewPropTypes} from '../../prop-types/prop-types.js';
import ActionCreator from '../../redux/actions/action-creator/action-creator.js';

const MAX_CITIES = 6;

const App = (props) => {
  const {offerCards, reviews, setDefaultCity, getOffersToRender, city} = props;
  if (!city) {
    // фильтром по умолчанию становится первый город в списке:
    setDefaultCity(offerCards[0].city.name);
    getOffersToRender(offerCards);
  }

  // TODO: куда лучше эту логику положить, имеет ли смысл в store хранить список городов?
  let cities = offerCards.map((offer) => offer.city.name);
  cities = Array.from(new Set(cities));
  cities = (cities.length > MAX_CITIES) ? cities.slice(0, MAX_CITIES) : cities;

  return (
    <Switch>
      <Route path = "/" exact render = {() => (
        <Main
          cities = {cities}
          allOffers = {offerCards}
        />)}/>
      <Route path = "/offer/:id" render = {(allProps) => <OfferPage
        offers = {offerCards}
        reviews = {reviews}
        {...allProps}
      />}/>
      {/* TODO: не пойму почему не срабатывает Redirect при вводе вручную любого несуществующего path
      и почему вообще если вводить в адресную строку вручную даже правильный адрес, типа /offer/1 то он не обрабатывается, а выдаёт ошибку?! Хотя если этот адрес попадает в строку от клика по ссылке (по заголовку карточки), то норм всё...?! */}
      <Redirect to = "/"/>
    </Switch>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  offerCards: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  nearbyCards: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes)),

  getOffersToRender: PropTypes.func,
  setDefaultCity: PropTypes.func,
  offersToRender: PropTypes.array,
  city: PropTypes.string,
};

export {App};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offersToRender: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  getOffersToRender: (offers) => dispatch(ActionCreator.getOffers(offers)),
  setDefaultCity: (city) => dispatch(ActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
