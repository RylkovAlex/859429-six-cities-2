import React from 'react';
import renderer from 'react-test-renderer';
import {OfferPage} from './offer-page';
import {offerCardForTests} from '../../prop-types/prop-types';

/* const copmponentsToMock = {
  OffersList: `../offers-list/offers-list.jsx`,
  ReviewsList: `../reviews-list/reviews-list.jsx`,
  Header: `../header/header.jsx`,
  OfferCard: `../offer-card/offer-card.jsx`,
  ReviewForm: `../review-form/review-form.jsx`,
}; */

// TODO: не работает..
/* const modules = Object.values(copmponentsToMock);
for (let i = 0; i < modules.length; i++) {
  jest.mock(modules[i], () => jest.fn().mockReturnValue(null));
} */

jest.mock(`../map-component/map-component.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../../redux/selectors/selectors`, () => ({
  __esModule: true,
  getMapConfig: jest.fn().mockReturnValue(null),
}));
jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../review-form/review-form.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../offers-list/offers-list.jsx`, () => ({
  __esModule: true,
  ListType: {
    NearbyList: ``
  },
  OfferList: () => null,
  default: () => null,
}));

it(`OfferPage correctly renders after relaunch`, () => {
  const props = {
    activeCard: 0,
    loadReviews: jest.fn(),
    isReviewsLoading: false,
    isReviewsLoadingError: false,
    offers: [offerCardForTests],
    reviews: [],
    match: {
      params: {
        id: `0`,
      }
    },
    changeActiveCard: jest.fn(),
    postFavorite: jest.fn(),
    isAuthorized: true,
  };

  const tree = renderer
    .create(<OfferPage {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
