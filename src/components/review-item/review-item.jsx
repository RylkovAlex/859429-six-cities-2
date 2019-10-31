import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropTypes} from '../../prop-types/prop-types';

const DATE_OPTIONS = {
  month: `long`,
  day: `numeric`,
};

const ReviewItem = ({review}) => {

  const {user} = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${user.rating * 20}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={`${new Date(review.date).toISOString()}`}>{`${new Date(new Date(review.date).toLocaleDateString(`en`, DATE_OPTIONS))}`}</time>
      </div>
    </li>

  );
};

ReviewItem.propTypes = {
  review: PropTypes.shape(reviewPropTypes),
};

export default ReviewItem;
