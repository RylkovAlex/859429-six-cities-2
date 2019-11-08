import {CHANGE_CITY, GET_OFFERS} from "../action-types";

const ActionCreator = {
  changeCity: (city) => ({
    type: CHANGE_CITY,
    city,
  }),

  getOffers: (offers) => ({
    type: GET_OFFERS,
    offers,
  })
};

export default ActionCreator;
