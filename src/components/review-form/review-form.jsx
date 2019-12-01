import React, {useRef, useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation} from "../../redux/actions/action-creator/action-creator";
import withInputsState from "../hocs/withInputsState/withInputsState";

const ReviewForm = ({
  setInput,
  inputValues,
  isFormValid,
  hotelId,
  sendReview,
  isReviewSending,
  reviewSentSuccessfully
}) => {

  const handleRatingInput = (evt) => {
    setInput(`rating`, evt.target.value);
  };
  const ratingValues = [5, 4, 3, 2, 1];

  // Для очистки формы в случае успешной отправки:
  const ratingRefs = ratingValues.map(() => useRef(null));
  const commentRef = useRef(null);
  useEffect(() => {
    if (reviewSentSuccessfully) {
      ratingRefs.forEach((ref) => {
        ref.current.checked = false;
      });
      commentRef.current.value = ``;
      setInput(`comment`, ``);
      setInput(`rating`, ``);
    }
  }, [reviewSentSuccessfully]);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingValues.map((value, i) => (
          <React.Fragment key={`rating - ${value}`}>
            <input
              ref={ratingRefs[i]}
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleRatingInput}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        ref={commentRef}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={(evt) => setInput(`comment`, evt.target.value)}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{` `}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isReviewSending}
          onClick={(evt) => {
            evt.preventDefault();
            sendReview(inputValues, hotelId);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  sendReview: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  isReviewSending: PropTypes.bool.isRequired,
  reviewSentSuccessfully: PropTypes.bool.isRequired,
  inputValues: PropTypes.object,
  hotelId: PropTypes.number.isRequired
};

export {ReviewForm};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    isReviewSending: state.isReviewSending,
    reviewSentSuccessfully: state.reviewSentSuccessfully
  });

const mapDispatchToProps = (dispatch) => ({
  sendReview: (review, hotelId) =>
    dispatch(Operation.sendReview(review, hotelId))
});

const formWithState = withInputsState(ReviewForm, [`rating`, `comment`], {
  rating: {
    required: true
  },
  comment: {
    minLength: 50,
    maxLength: 300
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(formWithState);
