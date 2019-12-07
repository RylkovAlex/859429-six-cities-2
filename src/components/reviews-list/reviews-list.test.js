import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list';
import {reviewsMock} from '../../mocks/reviews';
jest.mock(`../review-item/review-item.jsx`, () => () => <div/>);

it(`ReviewsList correctly renders after relaunch`, () => {
  const props = {
    reviews: reviewsMock,
  };

  const tree = renderer
    .create(<ReviewsList {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
