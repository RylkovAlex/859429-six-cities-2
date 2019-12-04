import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS, LOGIN_SUCCESS, SEND_REVIEW_START, SEND_REVIEW_SUCCESS, POST_FAVORITE_SUCCESS, FETCH_START, FETCH_SUCCESS, FETCH_ERROR, LOAD_REVIEWS_SUCCESS, LOAD_REVIEWS_START, SEND_REVIEW_ERROR, LOAD_REVIEWS_ERROR, LOAD_OFFERS_ERROR, CLEAR_USER} from "../action-types";
import {offerAdapter, reviewAdapter} from "../../../api/api";

const ActionCreator = {
  changeCity: (city) => ({
    type: CHANGE_CITY,
    city,
  }),

  changeActiveCard: (cardId) => ({
    type: CHANGE_ACTIVE_CARD,
    cardId,
  }),

  loadOffersSuccess: (offers) => ({
    type: LOAD_OFFERS_SUCCESS,
    offers,
  }),
  loadOffersError: () => ({
    type: LOAD_OFFERS_ERROR,
  }),

  loginSuccess: (user) => ({
    type: LOGIN_SUCCESS,
    user,
  }),

  clearUser: () => {
    return ({
      type: CLEAR_USER,
    });
  },

  sendReviewStart: () => ({
    type: SEND_REVIEW_START,
  }),
  sendReviewSuccess: () => ({
    type: SEND_REVIEW_SUCCESS,
  }),
  sendReviewError: () => ({
    type: SEND_REVIEW_ERROR,
  }),

  postFavoriteSuccess: (hotelId, status) => ({
    type: POST_FAVORITE_SUCCESS,
    payload: {id: hotelId, status}
  }),
  /*   postFavoriteError: () => ({
    type: POST_FAVORITE_ERROR,
  }), */

  loadReviewsStart: () => ({
    type: LOAD_REVIEWS_START,
  }),
  loadReviewsSuccess: (reviews) => ({
    type: LOAD_REVIEWS_SUCCESS,
    reviews,
  }),
  loadReviewsError: () => ({
    type: LOAD_REVIEWS_ERROR,
  }),

  fetchStart: () => ({
    type: FETCH_START,
  }),
  fetchSuccess: () => ({
    type: FETCH_SUCCESS,
  }),
  fetchError: (fetchUrl, error) => ({
    type: FETCH_ERROR,
    payload: {
      url: fetchUrl,
      message: error.message,
      error,
    }
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const offers = response.data.map(((offer) => offerAdapter.toModel(offer)));
      dispatch(ActionCreator.loadOffersSuccess(offers));
    }).catch((err) => {
      dispatch(ActionCreator.loadOffersError());
      throw err;
    });
  },

  sendAuthData: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, authData).then((response) => {
      localStorage.setItem(`user`, JSON.stringify(response.data));
      dispatch(ActionCreator.loginSuccess(response.data));
    });
  },

  loadReviews: (hotelId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadReviewsStart());
    return api.get(`/comments/${hotelId}`).then((response) => {
      const reviews = response.data.map((review) => reviewAdapter.toModel(review));
      dispatch(ActionCreator.loadReviewsSuccess(reviews));
    }).catch((err) => {
      dispatch(ActionCreator.loadReviewsError());
      throw (err);
    });
  },

  sendReview: (review, hotelId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.sendReviewStart());
    return api.post(`/comments/${hotelId}`, review).then(() => {
      dispatch(ActionCreator.sendReviewSuccess());
      // Обновляю список отзывов:
      dispatch(Operation.loadReviews(hotelId));
    }).catch((err) => {
      dispatch(ActionCreator.sendReviewError());
      throw err;
    });
  },

  postFavorite: (hotelId, status) => (dispatch, getState, api) => {
    return api.post(`favorite/${hotelId}/${status ? 1 : 0}`).then(() => {
      dispatch(ActionCreator.postFavoriteSuccess(hotelId, status));
    });
  },
};

export default ActionCreator;
