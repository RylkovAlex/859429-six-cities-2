import {CHANGE_CITY, CHANGE_ACTIVE_CARD} from "../actions/action-types";
import {offerCards} from "../../mocks/offers";
import {reviewsMock} from "../../mocks/reviews";

export const appInitialState = {
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    }
  },
  allOffers: offerCards,
  activeCard: -1,
  reviews: reviewsMock, // пока здесь, потом видимо нужно будет их запрашивать с сервера для конкретной карточки
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case CHANGE_CITY: return Object.assign({}, state, {
      city: action.city,
    });
    case CHANGE_ACTIVE_CARD: return Object.assign({}, state, {
      activeCard: action.cardId,
    });
  }
  return state;
};

export default appReducer;
