import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import OffersList from '../offers-list/offers-list.jsx';
// import {offerCardPropTypes} from '../../prop-types/prop-types.js';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import ActionCreator, {Operation} from '../../redux/actions/action-creator/action-creator.js';
import SortingForm from '../sorting-form/sorting-form.jsx';
import MainEmpty from '../main-empty/main-empty.jsx';
import {getOffersToShow, getCities, getMapConfig} from '../../redux/selectors/selectors.js';
import MapComponent from '../map-component/map-component.jsx';

const ListType = {
  MainList: `main`,
  NearbyList: `nearby`,
};

const Main = (props) => {
  const {offersToShow, cities, city, sortedOffers, sortingType, sortOffers, postFavorite, activeCard} = props;
  const handleCardHover = props.changeActiveCard;
  const handleCityClick = (evt) => {
    evt.preventDefault();
    props.setCity(props.cities.find((c) => c.name === evt.target.textContent));
  };

  const getContentJSX = (offers) => {
    if (offers.length) {
      return (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersToShow.length} places to stay in {city.name}</b>
              {/* СОРОТИРОВКА */}
              <SortingForm
                sortingType = {sortingType}
                sortOffers = {sortOffers}
              />
              {/* ПРЕДЛОЖЕНИЯ ПО АРЕНДЕ */}
              <OffersList
                offerCards = {sortedOffers}
                listType = {ListType.MainList}
                handleCardHover = {handleCardHover}
                handleBookmarkClick = {postFavorite}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <MapComponent
                  config = {getMapConfig(offersToShow)}
                  activePointId = {activeCard}
                />
              </section>
            </div>
          </div>
        </div>
      );
    }
    return <MainEmpty/>;
  };

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              city = {city}
              cities = {cities}
              cityClickHandler = {handleCityClick}
            />
          </section>
        </div>
        {getContentJSX(offersToShow)}
      </main>
    </div>
  );
};

Main.propTypes = {
  activeCard: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
  setCity: PropTypes.func.isRequired,
  offersToShow: PropTypes.array.isRequired,
  city: PropTypes.object.isRequired,
  changeActiveCard: PropTypes.func.isRequired,
  sortedOffers: PropTypes.array.isRequired,
  sortingType: PropTypes.string.isRequired,
  sortOffers: PropTypes.func.isRequired,
  postFavorite: PropTypes.func.isRequired,
};

export {Main};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCard: state.activeCard,
  city: state.city,
  cities: getCities(state),
  offersToShow: getOffersToShow(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCity: (city) => dispatch(ActionCreator.changeCity(city)),
  changeActiveCard: (cardId) => dispatch(ActionCreator.changeActiveCard(cardId)),
  postFavorite: (cardId, status) => dispatch(Operation.postFavorite(cardId, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
