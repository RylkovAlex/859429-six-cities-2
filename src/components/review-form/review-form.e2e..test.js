import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {ReviewForm} from './review-form';

Enzyme.configure({adapter: new Adapter()});

const inputValues = {
  rating: ``,
  comment: ``,
};
const hotelId = 1;
const changeInputHandler = jest.fn();

it(`ReviewForm is correctly handle submit and inputs changes`, () => {
  const submitHandler = jest.fn();
  const reviewForm = shallow(<ReviewForm
    sendReview = {submitHandler}
    setInput = {changeInputHandler}
    isFormValid = {true}
    isReviewSending = {false}
    reviewSentSuccessfully = {false}
    isReviewSendingError = {false}
    inputValues = {inputValues}
    hotelId = {hotelId}
  />);

  const submitButton = reviewForm.find(`.reviews__submit`);
  const mockClickEvent = {
    preventDefault() {}
  };

  submitButton.simulate(`click`, mockClickEvent);
  expect(submitHandler).toHaveBeenCalledWith(inputValues, hotelId);

  const ratingInputs = reviewForm.find(`.form__rating-input`);
  const commentInput = reviewForm.find(`.reviews__textarea`);
  const mockChangeEvent = {
    preventDefault: () => {},
    target: {
      value: 5,
    },
  };
  ratingInputs.at(0).simulate(`change`, mockChangeEvent);
  expect(changeInputHandler).toHaveBeenCalledWith(`rating`, mockChangeEvent.target.value);

  mockChangeEvent.target.value = `comment text`;
  commentInput.simulate(`change`, mockChangeEvent);
  expect(changeInputHandler).toHaveBeenCalledWith(`comment`, mockChangeEvent.target.value);
});

it(`ReviewForm is correctly disable submit if form is invalid`, () => {
  const submitHandler = jest.fn();
  const reviewForm = shallow(<ReviewForm
    sendReview = {submitHandler}
    setInput = {changeInputHandler}
    isFormValid = {false}
    isReviewSending = {false}
    reviewSentSuccessfully = {false}
    isReviewSendingError = {false}
    inputValues = {inputValues}
    hotelId = {hotelId}
  />);

  const submitButton = reviewForm.find(`.reviews__submit`);
  expect(submitButton.prop(`disabled`)).toBe(true);
});
