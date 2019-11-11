import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';
import {cities} from '../../mocks/offers';

it(`OfferPage correctly renders after relaunch`, () => {
  const props = {
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      }
    },
    cities,
    cityClickHandler: jest.fn(),
  };

  const tree = renderer
    .create(<CitiesList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
