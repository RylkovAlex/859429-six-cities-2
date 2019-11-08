import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropTypes, offerCardPropTypes} from '../../prop-types/prop-types';

import OffersList, {ListType} from '../offers-list/offers-list.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Header from '../header/header.jsx';
import Map from '../map/map.jsx';

class OfferPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeCardId: null,
    };

    this._cardHoverHandler = this._cardHoverHandler.bind(this);
  }

  render() {
    const {reviews, offers} = this.props;
    const card = offers.find((offer) => +offer.id === +this.props.match.params.id);
    const nearbyCards = offers.filter((offer) => offer.city.name === card.city.name && offer.id !== card.id);
    const {images, title, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description} = card;
    const ratingStyle = {
      width: `${rating * 20}%`,
    };
    return (
      <div className="page">
        <Header/>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((src, i) => {
                  return (
                    <div className="property__image-wrapper" key={`property__image - ${i}`}>
                      <img className="property__image" src={src} alt="Photo studio"/>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                <div className="property__mark">
                  {isPremium ? <span>Premium</span> : ``}
                </div>
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={ratingStyle}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((good, i) => <li className="property__inside-item" key={`inside-item-${i}`}>
                      {good}
                    </li>)}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={host.avtarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                    <span className="property__user-status">
                      {host.isPro ? `Pro` : ``}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                {/* ОТЗЫВЫ */}
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  {/* Список отзывов */}
                  <ReviewsList reviews = {reviews}/>
                  <form className="reviews__form form" action="#" method="post">
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
            {/* КАРТА */}
            <Map
              points = {nearbyCards}
            >
              <section className="property__map map"></section>
            </Map>
          </section>

          {/* Похожие */}
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList
                offerCards = {nearbyCards}
                listType = {ListType.NearbyList}
                onCardHover = {this._cardHoverHandler}
              >
              </OffersList>
            </section>
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
}

OfferPage.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes)),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  })
};

export default OfferPage;
