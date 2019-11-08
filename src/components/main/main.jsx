import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import OffersList from '../offers-list/offers-list.jsx';
import {offerCardPropTypes} from '../../prop-types/prop-types.js';
import Map from '../map/map.jsx';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import ActionCreator from '../../redux/actions/action-creator/action-creator.js';

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
    const {offersToRender, cities, city, offerCards} = this.props;
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
                <b className="places__found">312 places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  {/* <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul> */}

                  {/* <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select> */}
                </form>
                {/* ПРЕДЛОЖЕНИЯ ПО АРЕНДЕ */}
                <OffersList
                  offerCards = {offerCards}
                  listType = {ListType.MainList}
                  onCardHover = {this._cardHoverHandler}
                >
                </OffersList>
              </section>
              <div className="cities__right-section">
                <Map points = {offersToRender}>
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

  _cardHoverHandler(cardId) {
    this.setState({
      activeCardId: cardId,
    });
  }

  _onCityClick(evt) {
    evt.preventDefault();
    this.props.setCity(evt.target.textContent);
    this.props.setOffersToRender(this.props.offerCards);
  }
}

Main.propTypes = {
  offerCards: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  cities: PropTypes.array,
  onCardClick: PropTypes.func,

  setCity: PropTypes.func,
  setOffersToRender: PropTypes.func,
  offersToRender: PropTypes.array,
  city: PropTypes.string,

};

export {Main};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.city,
  offersToRender: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  setOffersToRender: (offers) => dispatch(ActionCreator.getOffers(offers)),
  setCity: (city) => dispatch(ActionCreator.changeCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
