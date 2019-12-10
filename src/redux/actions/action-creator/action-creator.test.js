import ActionCreator from "./action-creator";
import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS, LOAD_OFFERS_ERROR, LOGIN_SUCCESS, CLEAR_USER, SEND_REVIEW_START, SEND_REVIEW_SUCCESS, SEND_REVIEW_ERROR, POST_FAVORITE_SUCCESS, LOAD_REVIEWS_START, LOAD_REVIEWS_ERROR, FETCH_START, FETCH_SUCCESS, FETCH_ERROR, LOAD_REVIEWS_SUCCESS} from "../action-types";
import {reviewsMock} from "../../../mocks/reviews";

describe(`Action creators work correctly`, () => {
  it(`ActionCreator.changeCity() returns correct action`, () => {
    expect(ActionCreator.changeCity({})).toEqual({
      type: CHANGE_CITY,
      city: {},
    });
  });

  it(`ActionCreator.changeActiveCard() returns correct action`, () => {
    expect(ActionCreator.changeActiveCard(1)).toEqual({
      type: CHANGE_ACTIVE_CARD,
      cardId: 1,
    });
  });

  it(`ActionCreator.loadOffersSuccess() returns correct action`, () => {
    expect(ActionCreator.loadOffersSuccess([])).toEqual({
      type: LOAD_OFFERS_SUCCESS,
      offers: [],
    });
  });

  it(`ActionCreator.loadOffersError() returns correct action`, () => {
    expect(ActionCreator.loadOffersError()).toEqual({
      type: LOAD_OFFERS_ERROR,
    });
  });

  it(`ActionCreator.loginSuccess() returns correct action`, () => {
    expect(ActionCreator.loginSuccess({})).toEqual({
      type: LOGIN_SUCCESS,
      user: {}
    });
  });

  it(`ActionCreator.clearUser() returns correct action`, () => {
    expect(ActionCreator.clearUser()).toEqual({
      type: CLEAR_USER,
    });
  });

  it(`ActionCreator.sendReviewStart() returns correct action`, () => {
    expect(ActionCreator.sendReviewStart()).toEqual({
      type: SEND_REVIEW_START,
    });
  });

  it(`ActionCreator.sendReviewSuccess() returns correct action`, () => {
    expect(ActionCreator.sendReviewSuccess()).toEqual({
      type: SEND_REVIEW_SUCCESS,
    });
  });

  it(`ActionCreator.sendReviewError() returns correct action`, () => {
    expect(ActionCreator.sendReviewError()).toEqual({
      type: SEND_REVIEW_ERROR,
    });
  });

  it(`ActionCreator.postFavoriteSuccess() returns correct action`, () => {
    expect(ActionCreator.postFavoriteSuccess(1, true)).toEqual({
      type: POST_FAVORITE_SUCCESS,
      payload: {id: 1, status: true}
    });
  });

  it(`ActionCreator.loadReviewsStart() returns correct action`, () => {
    expect(ActionCreator.loadReviewsStart()).toEqual({
      type: LOAD_REVIEWS_START,
    });
  });

  it(`ActionCreator.loadReviewsSuccess() returns correct action`, () => {
    const sortedReviews = reviewsMock.sort((a, b) => new Date(b.date) - new Date(a.date));
    expect(ActionCreator.loadReviewsSuccess(reviewsMock)).toEqual({
      type: LOAD_REVIEWS_SUCCESS,
      reviews: sortedReviews,
    });
  });

  it(`ActionCreator.loadReviewsError() returns correct action`, () => {
    expect(ActionCreator.loadReviewsError()).toEqual({
      type: LOAD_REVIEWS_ERROR,
    });
  });

  it(`ActionCreator.fetchStart() returns correct action`, () => {
    expect(ActionCreator.fetchStart()).toEqual({
      type: FETCH_START,
    });
  });

  it(`ActionCreator.fetchSuccess() returns correct action`, () => {
    expect(ActionCreator.fetchSuccess()).toEqual({
      type: FETCH_SUCCESS,
    });
  });

  it(`ActionCreator.fetchError() returns correct action`, () => {
    const error = {
      url: `url/`,
      message: `message`,
    };
    expect(ActionCreator.fetchError(`url/`, error)).toEqual({
      type: FETCH_ERROR,
      payload: {
        url: `url/`,
        message: `message`,
        error,
      }
    });
  });

});
