import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card';
import {MemoryRouter} from 'react-router';
import {ListType} from '../offers-list/offers-list';
import {offersMock} from '../../mocks/offers';

it(`OfferCard correctly renders after relaunch`, () => {
  const props = {
    card: offersMock[0],
    handleCardHover: jest.fn(),
    handleBookmarkClick: jest.fn(),
    cardType: ListType.MainList,
    isFetching: false,
    isAuthorized: true,
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <OfferCard {...props}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
