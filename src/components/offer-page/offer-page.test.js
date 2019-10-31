import React from 'react';
import renderer from 'react-test-renderer';
import OfferPage from './offer-page';
import {offerCardForTests} from '../../prop-types/prop-types';

const copmponentsToMock = {
  OffersList: `../offers-list/offers-list.jsx`,
  ReviewsList: `../reviews-list/reviews-list.jsx`,
  Header: `../header/header.jsx`,
  Map: `../map/map.jsx`,
  OfferCard: `../offer-card/offer-card.jsx`,
};
// TODO: не пойму почему не работает:
Object.values(copmponentsToMock).forEach((path) => {
  jest.mock(path, () => jest.fn().mockReturnValue(null));
});
// приходится повторять:
jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));

it(`OfferPage correctly renders after relaunch`, () => {
  const props = {
    card: offerCardForTests,
    nearbyCards: [],
    reviews: [],
  };

  const tree = renderer
    .create(<OfferPage {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
