import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {OfferCard} from './offer-card';
import {offersMock} from '../../mocks/offers';
import {ListType} from '../offers-list/offers-list';

Enzyme.configure({adapter: new Adapter()});

it(`OfferCard is correctly handle hover`, () => {
  const onCardHoverHandler = jest.fn();
  const onBookmarkClickHandler = jest.fn();
  const cardId = Math.floor(Math.random() * Math.floor(10));
  const cardData = offersMock[0];
  cardData.id = cardId;
  const offerCard = shallow(<OfferCard
    card = {cardData}
    handleCardHover = {onCardHoverHandler}
    handleBookmarkClick = {onBookmarkClickHandler}
    cardType = {ListType.MainList}
    isFetching = {false}
    isAuthorized = {true}
  />);

  const card = offerCard.find(`.place-card`);
  card.simulate(`mouseEnter`);
  expect(onCardHoverHandler).toHaveBeenCalledWith(cardId);
});
