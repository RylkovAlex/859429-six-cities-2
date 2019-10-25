import React from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import PropTypes from 'prop-types';

export default class OffersList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: null,
    };
  }

  render() {
    const {offerCards} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offerCards.map((card) => <OfferCard
          id = {card.id}
          key = {`card-${card.id}`}
          isPremium = {card.isPremium}
          isFavorite = {card.isFavorite}
          previewImage = {card.previewImage}
          price = {card.price}
          type = {card.type}
          title = {card.title}
          onCardHover = {this._cardHoverHandler.bind(this)}
        />)}
      </div>
    );
  }

  _cardHoverHandler(cardId) {
    this.setState({
      activeCardId: cardId,
    });
  }
}

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
};
