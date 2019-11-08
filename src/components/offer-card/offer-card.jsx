import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerCardPropTypes} from '../../prop-types/prop-types';
import classNames from 'classnames';
import {ListType} from '../offers-list/offers-list.jsx';

const OfferCard = ({card, onCardHover, cardType}) => {
  const {id, isPremium, previewImage, rating, price, type, title, isFavorite} = card;
  const cardClasses = classNames({
    'place-card': true,
    'cities__place-card': (cardType === ListType.MainList),
    'near-places__card': (cardType === ListType.NearbyList)
  });
  const buttonClasses = classNames({
    'place-card__bookmark-button button': true,
    'place-card__bookmark-button--active': isFavorite,
  });
  const cardImageWrapperClasses = classNames({
    'place-card__image-wrapper': true,
    'cities__image-wrapper': (cardType === ListType.MainList),
    'near-places__image-wrapper': (cardType === ListType.NearbyList)
  });

  const ratingStyle = {
    width: `${rating * 20}%`,
  };

  return (
    <article
      className={cardClasses}
      onMouseEnter = {() => {
        onCardHover(id);
      }}
    >
      {isPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className={`${cardImageWrapperClasses}`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={buttonClasses} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to = {`/offer/${id}`}
            exact = "true"
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  card: PropTypes.shape(offerCardPropTypes),
  onCardHover: PropTypes.func,
  cardType: PropTypes.string,
};

export default OfferCard;
