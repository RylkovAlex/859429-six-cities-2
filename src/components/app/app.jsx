import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import OfferPage from '../offer-page/offer-page.jsx';
import {offerCardPropTypes, reviewPropTypes} from '../../prop-types/prop-types.js';

export const App = (props) => {
  const {offerCards, reviews, location} = props;
  let cardToShow = null; // TODO: надо ли state заводить под это дело? просто мне надо хранить эту карточку, чтоб 2 раза не вызывать getCardToShow, когда передаю пропсы компоненту OfferPage
  const getCardToShow = (loc) => {
    const id = +loc.pathname.replace(`/offer/`, ``);
    if (Number.isInteger(id)) {
      cardToShow = offerCards.find((card) => card.id === id);
      return cardToShow;
    }
    return null;
  };

  return (
    <Switch>
      <Route path = "/" exact render = {() => <Main offerCards = {offerCards} />}/>
      <Route path = "/offer/" render = {() => <OfferPage
        card = {getCardToShow(location)}
        reviews = {reviews}
        nearbyCards = {offerCards.filter((card) => card.city.name === cardToShow.city.name && card.id !== cardToShow.id)}
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
};

export default withRouter(App);
