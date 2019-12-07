import React from 'react';
import renderer from 'react-test-renderer';
import {OfferPage} from './offer-page';
import {offersMock} from '../../mocks/offers';
import {reviewsMock} from '../../mocks/reviews';

jest.mock(`../offers-list/offers-list.jsx`, () => ({
  __esModule: true,
  ListType: {
    NearbyList: ``
  },
  OfferList: () => null,
  default: () => null,
}));
jest.mock(`../reviews-list/reviews-list.jsx`, () => () => <div/>);
jest.mock(`../header/header.jsx`, () => () => <div/>);
jest.mock(`../review-form/review-form.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map-component/map-component.jsx`, () => () => <div/>);
jest.mock(`../../redux/selectors/selectors`, () => ({
  __esModule: true,
  getMapConfig: jest.fn().mockReturnValue(null),
}));


it(`OfferPage correctly renders after relaunch`, () => {
  const props = {
    activeCard: 0,
    loadReviews: jest.fn(),
    isReviewsLoading: false,
    isReviewsLoadingError: false,
    offers: offersMock,
    reviews: reviewsMock,
    match: {
      params: {
        id: `1`,
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
