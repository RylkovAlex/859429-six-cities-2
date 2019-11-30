import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS, LOGIN_SUCCESS} from "../actions/action-types";
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
  allOffers: [],
  user: null,
  activeCard: -1,
  isAppReady: false,
  isAuthorizationRequired: true,
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
    case LOAD_OFFERS_SUCCESS: return Object.assign({}, state, {
      isAppReady: true,
      allOffers: action.offers,
    });
    case LOGIN_SUCCESS: return Object.assign({}, state, {
      isAuthorizationRequired: false,
      user: action.user,
    });
  }
  return state;
};

export default appReducer;
