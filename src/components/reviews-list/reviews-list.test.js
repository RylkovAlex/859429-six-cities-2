import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list';
jest.mock(`../review-item/review-item.jsx`, () => jest.fn().mockReturnValue(null));

it(`ReviewsList correctly renders after relaunch`, () => {
  const props = {
    reviews: [],
  };

  const tree = renderer
    .create(<ReviewsList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
