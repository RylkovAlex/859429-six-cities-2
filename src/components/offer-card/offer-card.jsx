import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {offerCardPropTypes} from '../../prop-types/prop-types';

const OfferCard = ({card, onCardHover}) => {
  const {id, isPremium, previewImage, rating, price, type, title, isFavorite} = card;

  const buttonClasses = [`place-card__bookmark-button`, `button`];
  if (isFavorite) {
    buttonClasses.push(`place-card__bookmark-button--active`);
  }

  const ratingStyle = {
    width: `${rating * 20}%`,
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter = {() => {
        onCardHover(id);
      }}
    >
      <div className="place-card__mark">
        <span>{isPremium ? `Premium` : ``}</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
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
          <button className={buttonClasses.join(` `)} type="button">
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
          {/* TODO: не знаю правильно ли через NavLink сделал или нужно как-то иначе обрабатывать клик по заголовку?*/}
          <NavLink
            to = {`/offer/${id}`}
            exact
          >
            {title}
          </NavLink>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  card: PropTypes.shape(offerCardPropTypes),
  onCardHover: PropTypes.func,
};

export default OfferCard;
