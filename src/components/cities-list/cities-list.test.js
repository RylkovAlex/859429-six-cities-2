import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';

it(`OfferPage correctly renders after relaunch`, () => {
  const props = {
    city: ``,
    cities: [``],
    cityClickHandler: jest.fn(),
  };

  const tree = renderer
    .create(<CitiesList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
