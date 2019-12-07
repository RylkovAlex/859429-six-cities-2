import React from 'react';
import renderer from 'react-test-renderer';
import OfferList, {ListType} from './offers-list';
import {offersMock} from '../../mocks/offers';

jest.mock(`../offer-card/offer-card.jsx`, () => () => <div/>);

it(`OfferList correctly renders after relaunch`, () => {
  const props = {
    offerCards: offersMock,
    listType: ListType.MainList,
    handleCardHover: jest.fn(),
    handleBookmarkClick: jest.fn(),
  };

  const tree = renderer
    .create(<OfferList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
