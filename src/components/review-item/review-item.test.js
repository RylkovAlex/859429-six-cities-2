import React from 'react';
import renderer from 'react-test-renderer';
import ReviewItem from './review-item';
import {reviewForTests} from '../../prop-types/prop-types';

it(`ReviewItem correctly renders after relaunch`, () => {
  const props = {
    review: reviewForTests,
  };

  const tree = renderer
    .create(<ReviewItem {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
