import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../../prop-types/prop-types';
import {ListType} from '../offers-list/offers-list';

it(`PlaceCard correctly renders after relaunch`, () => {
  const props = {
    card: offerCardForTests,
    onCardHover: jest.fn(),
    cardType: ListType.MainList,
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
