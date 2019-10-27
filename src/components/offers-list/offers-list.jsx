import React from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import PropTypes from 'prop-types';

const OffersList = (props) => {
  const {offerCards, onCardHover} = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offerCards.map((card) => <OfferCard
        id = {card.id}
        key = {`card-${card.id}`}
        isPremium = {card.isPremium}
        isFavorite = {card.isFavorite}
        rating = {card.rating}
        previewImage = {card.previewImage}
        price = {card.price}
        type = {card.type}
        title = {card.title}
        onCardHover = {onCardHover}
      />)}
    </div>
  );
};

OffersList.propTypes = {
  offerCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.title,
  })),
  onCardHover: PropTypes.func,
};

export default OffersList;
