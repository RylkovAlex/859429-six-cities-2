import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import ActionCreator, {Operation} from '../../redux/actions/action-creator/action-creator';
import {getFavorites, getCities} from '../../redux/selectors/selectors';

import {firstToUpperCase} from '../../utils/utils';
import Header from '../header/header.jsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import OffersList, {ListType} from '../offers-list/offers-list.jsx';
import withAuth from '../../hocs/with-auth/with-auth.jsx';

const Favorites = ({favorites, postFavorite, activeCity, cities, setCity}) => {
  const handleCityLinkClick = (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    setCity(city);
  };
  if (favorites.every((group) => !group.hotels.length)) {
    return <FavoritesEmpty/>;
  }
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favorites.map((group) => {
                if (!group.hotels.length) {
                  return null;
                }
                return (
                  <li key={group.city} className="favorites__locations-items">
                    <div className={`favorites__locations locations ${group.city === activeCity.name ? `locations--current` : ``}`}>
                      <div className="locations__item">
                        <Link to="/"
                          className="locations__item-link"
                          href="#"
                          onClick={() => handleCityLinkClick(group.city)}
                        >
                          <span>{firstToUpperCase(group.city)}</span>
                        </Link>
                      </div>
                    </div>
                    <OffersList
                      offerCards = {group.hotels}
                      listType = {ListType.FavoriteList}
                      handleCardHover = {()=>{}}
                      handleBookmarkClick = {postFavorite}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  postFavorite: PropTypes.func.isRequired,
  activeCity: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  setCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.city,
  cities: getCities(state),
  favorites: getFavorites(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCity: (city) => dispatch(ActionCreator.changeCity(city)),
  postFavorite: (cardId, status) => dispatch(Operation.postFavorite(cardId, status)),
});

export {Favorites};
export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Favorites));
