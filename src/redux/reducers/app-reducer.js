import {CHANGE_CITY, CHANGE_ACTIVE_CARD, LOAD_OFFERS_SUCCESS, LOGIN_SUCCESS, SEND_REVIEW_START, SEND_REVIEW_SUCCESS, POST_FAVORITE_SUCCESS, FETCH_START, FETCH_SUCCESS, FETCH_ERROR} from "../actions/action-types";
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
  isReviewSending: false,
  reviewSentSuccessfully: false,
  isFetching: false,
  fetchError: null,
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
    case SEND_REVIEW_START: return Object.assign({}, state, {
      isReviewSending: true,
      reviewSentSuccessfully: false,
    });
    case SEND_REVIEW_SUCCESS: return Object.assign({}, state, {
      isReviewSending: false,
      reviewSentSuccessfully: true,
    });
    case FETCH_START: return Object.assign({}, state, {
      isFetching: true,
      fetchError: null,
    });
    case FETCH_SUCCESS: return Object.assign({}, state, {
      isFetching: false,
    });
    case FETCH_ERROR: return Object.assign({}, state, {
      isFetching: false,
      fetchError: action.error,
    });
    case POST_FAVORITE_SUCCESS:
      // TODO: deepStateCopy, чтоб так не делать:
      const allOffers = [...state.allOffers];
      const index = allOffers.findIndex((offer) => offer.id === action.payload.id);
      const hotelCopy = Object.assign({}, allOffers[index]);
      hotelCopy.isFavorite = action.payload.status;
      allOffers.splice(index, 1, hotelCopy);

      return Object.assign({}, state, {
        allOffers,
      });
  }
  return state;
};

export default appReducer;
