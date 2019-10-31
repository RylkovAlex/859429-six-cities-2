import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../../prop-types/prop-types';

it(`PlaceCard correctly renders after relaunch`, () => {
  const props = {
    card: offerCardForTests,
    onCardHover: jest.fn(),
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
