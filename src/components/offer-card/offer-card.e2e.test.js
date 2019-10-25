import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import OfferCard from './offer-card';

Enzyme.configure({adapter: new Adapter()});

it(`OfferCard is correctly handle hover`, () => {
  const onCardHoverHandler = jest.fn();
  const cardId = Math.floor(Math.random() * Math.floor(10));
  const offerCard = shallow(<OfferCard
    id = {cardId}
    key = {0}
    isPremium = {false}
    isFavorite = {false}
    previewImage = {``}
    price = {0}
    type = {``}
    title = {``}
    onCardHover = {onCardHoverHandler}
  />);

  const card = offerCard.find(`.place-card`);
  card.simulate(`mouseEnter`);

  expect(onCardHoverHandler).toHaveBeenCalledWith(cardId);
});
