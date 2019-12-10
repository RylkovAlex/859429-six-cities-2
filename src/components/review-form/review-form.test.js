import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewForm} from './review-form';

it(`ReviewForm correctly renders after relaunch`, () => {
  const props = {
    sendReview: jest.fn(),
    setInput: jest.fn(),
    clearErrors: jest.fn(),
    isFormValid: true,
    isReviewSending: false,
    reviewSentSuccessfully: false,
    isReviewSendingError: false,
    inputValues: {
      rating: ``,
      comment: ``,
    },
    hotelId: 1
  };

  const tree = renderer
    .create(<ReviewForm {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
