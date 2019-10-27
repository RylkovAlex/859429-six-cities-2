import React from 'react';
import Main from './main/main.jsx';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import OfferPage from './offer-page/offer-page.jsx';

export const App = (props) => {
  const {offerCards, location} = props;

  const getCardToShow = (loc) => {
    const id = +loc.pathname.replace(`/offer/`, ``);
    if (Number.isInteger(id)) {
      return offerCards.find((card) => card.id === id);
    }
    return null;
  };

  return (
    <Switch>
      <Route path = "/" exact render = {() => <Main offerCards = {offerCards} />}/>
      <Route path = "/offer/" render = {() => <OfferPage card = {getCardToShow(location)}/>}/>
      {/* TODO: не пойму почему не срабатывает Redirect при вводе вручную любого несуществующего path
      и почему вообще если вводить в адресную строку вручную даже правильный адрес, типа /offer/1 то он не обрабатывается, а выдаёт ошибку?! Хотя если этот адрес попадает в строку от клика по ссылке (по заголовку карточки), то норм всё...?! */}
      <Redirect to = "/"/>
    </Switch>

  );
};

// TODO: надо ли так развёрнуто описывать Props'ы для тех компонентов, которые их не используют, а передают дальше?
App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  offerCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.title,
  })),
};

export default withRouter(App);
