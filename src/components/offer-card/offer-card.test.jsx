import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card';
import {MemoryRouter} from 'react-router';

it(`PlaceCard correctly renders after relaunch`, () => {
  const props = {
    id: 0,
    isPremium: false,
    isFavorite: false,
    previewImage: ``,
    price: 0,
    rating: 0,
    type: ``,
    title: ``,
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
