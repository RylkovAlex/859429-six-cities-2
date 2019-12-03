import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OfferCard from '../offer-card/offer-card.jsx';

export const ListType = {
  MainList: `main`,
  NearbyList: `nearby`,
  FavoriteList: `favorite`,
};

const OffersList = (props) => {
  const {listType, offerCards, handleCardHover, handleBookmarkClick} = props;
  const listClass = classNames({
    'cities__places-list places__list tabs__content': (listType === ListType.MainList),
    'near-places__list places__list': (listType === ListType.NearbyList),
    'favorites__places': (listType === ListType.FavoriteList),
  });

  return (
    <div className={listClass}>
      {offerCards.map((card) => <OfferCard
        key = {`card-${card.id}`}
        card = {card}
        cardType = {listType}
        handleCardHover = {handleCardHover}
        handleBookmarkClick = {handleBookmarkClick}
      />)}
    </div>
  );
};

OffersList.propTypes = {
  offerCards: PropTypes.array.isRequired,
  listType: PropTypes.string.isRequired,
  handleCardHover: PropTypes.func,
  handleBookmarkClick: PropTypes.func.isRequired,
};

export default OffersList;
