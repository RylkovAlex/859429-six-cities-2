import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import OffersList from '../offers-list/offers-list.jsx';
import {offerCardPropTypes} from '../../prop-types/prop-types.js';
import Map from '../map/map.jsx';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import ActionCreator from '../../redux/actions/action-creator/action-creator.js';
import SortingForm from '../sorting-form/sorting-form.jsx';

const ListType = {
  MainList: `main`,
  NearbyList: `nearby`,
};

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCardId: null,
    };

    this._cardHoverHandler = this._cardHoverHandler.bind(this);
    this._onCityClick = this._onCityClick.bind(this);
  }

  render() {
    const {offersToRender, cities, city} = this.props;
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
                cityClickHandler = {this._onCityClick}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersToRender.length} places to stay in Amsterdam</b>
                {/* СОРОТИРОВКА */}
                <SortingForm/>
                {/* ПРЕДЛОЖЕНИЯ ПО АРЕНДЕ */}
                <OffersList
                  offerCards = {offersToRender}
                  listType = {ListType.MainList}
                  onCardHover = {this._cardHoverHandler}
                >
                </OffersList>
              </section>
              <div className="cities__right-section">
                <Map>
                  <section className="cities__map map">
                  </section>
                </Map>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /*   _cardHoverHandler(cardId) {
    this.setState({
      activeCardId: cardId,
    });
  } */
  _cardHoverHandler(cardId) {
    this.props.changeActiveCard(cardId);
  }

  _onCityClick(evt) {
    evt.preventDefault();
    this.props.setCity(evt.target.textContent);
    this.props.setOffersToRender(this.props.allOffers);
  }
}

Main.propTypes = {
  allOffers: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  cities: PropTypes.array,
  onCardClick: PropTypes.func,

  setCity: PropTypes.func,
  setOffersToRender: PropTypes.func,
  offersToRender: PropTypes.array,
  city: PropTypes.string,
  changeActiveCard: PropTypes.func,

};

export {Main};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offersToRender: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  setOffersToRender: (offers) => dispatch(ActionCreator.getOffers(offers)),
  setCity: (city) => dispatch(ActionCreator.changeCity(city)),
  changeActiveCard: (cardId) => dispatch(ActionCreator.changeActiveCard(cardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
