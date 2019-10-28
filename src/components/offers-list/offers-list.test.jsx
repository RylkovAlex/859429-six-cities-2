import React from 'react';
import renderer from 'react-test-renderer';
import OfferList from './offers-list';

it(`OfferList correctly renders after relaunch`, () => {
  const props = {
    offerCards: [],
    onCardHover: jest.fn(),
  };

  const tree = renderer
    .create(<OfferList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
