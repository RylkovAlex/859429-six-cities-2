import React from 'react';
import renderer from 'react-test-renderer';
import OfferList from './offers-list';

jest.mock(`../offer-card/offer-card.jsx`, () => jest.fn().mockReturnValue(null));

it(`OfferList correctly renders after relaunch`, () => {
  const props = {
    children: <div/>,
    className: ``,
  };

  const tree = renderer
    .create(<OfferList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
