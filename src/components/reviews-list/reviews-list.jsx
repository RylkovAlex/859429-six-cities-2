import React from 'react';
import ReviewItem from '../review-item/review-item.jsx';
import PropTypes from 'prop-types';
import {reviewPropTypes} from '../../prop-types/prop-types';

const ReviewsList = ({reviews}) => {

  return (
    <ul className="reviews__list">
      {reviews.map((review) => {
        return (
          <ReviewItem
            key = {`review-${review.id}`}
            review = {review}
          />);
      })}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes)),
};

export default ReviewsList;
