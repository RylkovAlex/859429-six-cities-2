import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import OfferCard from './offer-card';
import {offerCardForTests} from '../../prop-types/prop-types';

Enzyme.configure({adapter: new Adapter()});

it(`OfferCard is correctly handle hover`, () => {
  const onCardHoverHandler = jest.fn();
  const cardId = Math.floor(Math.random() * Math.floor(10));
  const cardData = offerCardForTests;
  cardData.id = cardId;
  const offerCard = shallow(<OfferCard
    card = {cardData}
    onCardHover = {onCardHoverHandler}
  />);

  const card = offerCard.find(`.place-card`);
  card.simulate(`mouseEnter`);

  expect(onCardHoverHandler).toHaveBeenCalledWith(cardId);
});
