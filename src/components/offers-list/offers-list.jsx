import React from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import PropTypes from 'prop-types';
import {offerCardPropTypes} from '../../prop-types/prop-types.js';

const OffersList = (props) => {
  const {offerCards, onCardHover} = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offerCards.map((card) => <OfferCard
        key = {`card-${card.id}`}
        card = {card}
        onCardHover = {onCardHover}
      />)}
    </div>
  );
};

OffersList.propTypes = {
  offerCards: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  onCardHover: PropTypes.func,
};

export default OffersList;
