import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerCardPropTypes} from '../../prop-types/prop-types';
import classNames from 'classnames';
import {ListType} from '../offers-list/offers-list.jsx';
import {firstToUpperCase} from '../../utils/utils';
import BookmarkButton from '../bookmark-button/bookmark-button.jsx';
import history from '../../browser-history/browser-history';

const OfferCard = ({
  card,
  handleCardHover,
  cardType = ListType.MainList,
  handleBookmarkClick,
  isFetching,
  isAuthorized
}) => {
  const {
    id,
    isPremium,
    previewImage,
    rating,
    price,
    type,
    title,
    isFavorite,
  } = card;

  const cardClasses = classNames({
    'place-card': true,
    'cities__place-card': cardType === ListType.MainList,
    'near-places__card': cardType === ListType.NearbyList,
    'favorites__card': cardType === ListType.FavoriteList,
  });
  const buttonClasses = classNames({
    'place-card__bookmark-button button': true,
    'place-card__bookmark-button--active': isFavorite,
  });
  const cardImageWrapperClasses = classNames({
    'place-card__image-wrapper': true,
    'cities__image-wrapper': cardType === ListType.MainList,
    'near-places__image-wrapper': cardType === ListType.NearbyList,
    'favorites__image-wrapper': cardType === ListType.FavoriteList,
  });
  const cardInfoClasses = classNames({
    'place-card__info': true,
    'favorites__card-info': cardType === ListType.FavoriteList,
  });

  const bookmarkClickHandler = () => (
    isAuthorized ? handleBookmarkClick(id, !isFavorite) : history.push(`/login`)
  );

  const ratingStyle = {
    width: `${rating * 20}%`,
  };

  return (
    <article
      className={cardClasses}
      onMouseEnter={() => {
        handleCardHover(id);
      }}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : (
        ``
      )}
      <div className={`${cardImageWrapperClasses}`}>
        <Link to={`/offer/${id}`} exact="true">
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === ListType.FavoriteList ? 150 : 260}
            height={cardType === ListType.FavoriteList ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardInfoClasses}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            buttonClasses={buttonClasses}
            isFetching = {isFetching}
            handleBookmarkClick = {bookmarkClickHandler}
            isAuthorized = {isAuthorized}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`} exact="true">
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{firstToUpperCase(type)}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  card: PropTypes.shape(offerCardPropTypes).isRequired,
  handleCardHover: PropTypes.func,
  handleBookmarkClick: PropTypes.func.isRequired,
  cardType: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export {OfferCard};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isFetching: state.isFetching,
    isAuthorized: !!state.user,
  });

export default connect(mapStateToProps, null)(OfferCard);
