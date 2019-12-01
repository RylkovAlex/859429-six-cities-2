import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS, LOGIN_SUCCESS, SEND_REVIEW_START, SEND_REVIEW_SUCCESS} from "../action-types";
import {offerAdapter} from "../../../mocks/offers";

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

  loginSuccess: (user) => ({
    type: LOGIN_SUCCESS,
    user,
  }),

  sendReviewStart: () => ({
    type: SEND_REVIEW_START,
  }),

  sendReviewSuccess: () => ({
    type: SEND_REVIEW_SUCCESS,
  }),
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const offers = response.data.map(((offer) => offerAdapter.toModel(offer)));
      dispatch(ActionCreator.loadOffersSuccess(offers));
    });
  },

  fetchAuthData: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, authData).then((response) => {
      dispatch(ActionCreator.loginSuccess(response.data));
    });
  },

  sendReview: (review, hotelId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.sendReviewStart());
    return api.post(`/comments/${hotelId}`, review).then(() => {
      dispatch(ActionCreator.sendReviewSuccess());
    });
  }
};

export default ActionCreator;
