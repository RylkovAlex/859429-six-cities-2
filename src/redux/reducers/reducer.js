import {CHANGE_CITY, GET_OFFERS} from "../actions/action-types";

export const appInitialState = {
  city: ``,
  offers: [],
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case CHANGE_CITY: return Object.assign({}, state, {
      city: action.city,
    });
    case GET_OFFERS: return Object.assign({}, state, {
      offers: action.offers.filter((offer) => offer.city.name === state.city), // TODO: куда эту логику лучше вынести?
    });
  }
  return state;
};

export default appReducer;
