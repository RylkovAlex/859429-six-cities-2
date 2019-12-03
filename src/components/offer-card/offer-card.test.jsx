import React from 'react';
import renderer from 'react-test-renderer';
import {OfferCard} from './offer-card';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../../prop-types/prop-types';
import {ListType} from '../offers-list/offers-list';

it(`OfferCard correctly renders after relaunch`, () => {
  const props = {
    card: offerCardForTests,
    cardType: ListType.MainList,
    handleBookmarkClick: jest.fn(),
    isFetching: false,
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <OfferCard {...props}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(props.cardType).toEqual(`main`);
  expect(tree).toMatchSnapshot();
});
