import React from 'react';
import renderer from 'react-test-renderer';
import ReviewItem from './review-item';
import {reviewsMock} from '../../mocks/reviews';

it(`ReviewItem correctly renders after relaunch`, () => {
  const props = {
    review: reviewsMock[0],
  };

  const tree = renderer
    .create(<ReviewItem {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
