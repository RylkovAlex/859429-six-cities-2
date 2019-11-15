import {CHANGE_CITY, SET_OFFERS_TO_SHOW, SORT_OFFERS_TO_SHOW, CHANGE_ACTIVE_CARD} from "../actions/action-types";
import {offerCards, cities} from "../../mocks/offers";
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
  cities,
  allOffers: offerCards,
  offersToShow: offerCards.filter((offer) => offer.city.name === `Amsterdam`),
  activeCard: -1,
  reviews: reviewsMock, // пока здесь, потом видимо нужно будет их запрашивать с сервера для конкретной карточки
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case CHANGE_CITY: return Object.assign({}, state, {
      city: action.city,
    });
    case SET_OFFERS_TO_SHOW:
      return Object.assign({}, state, {
        offersToShow: state.allOffers.filter((offer) => offer.city.name === state.city.name),
      });
    case SORT_OFFERS_TO_SHOW:
      const sortedOffers = action.sorting([...state.offersToShow]);
      return Object.assign({}, state, {
        offersToShow: sortedOffers,
      });
    case CHANGE_ACTIVE_CARD: return Object.assign({}, state, {
      activeCard: action.cardId,
    });
  }
  return state;
};

export default appReducer;
