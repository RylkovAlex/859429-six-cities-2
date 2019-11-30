import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS, LOGIN_SUCCESS} from "../action-types";
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
  })
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
  }
};

export default ActionCreator;
