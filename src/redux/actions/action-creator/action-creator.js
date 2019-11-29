import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS} from "../action-types";
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
};

export const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const offers = response.data.map(((offer) => offerAdapter.toModel(offer)));
      dispatch(ActionCreator.loadOffersSuccess(offers));
    });
  }
};

export default ActionCreator;
