import {
  CHANGE_CITY,
  CHANGE_ACTIVE_CARD,
  LOAD_OFFERS_SUCCESS,
  LOGIN_SUCCESS,
  SEND_REVIEW_START,
  SEND_REVIEW_SUCCESS,
  POST_FAVORITE_SUCCESS,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  LOAD_REVIEWS_SUCCESS,
  LOAD_REVIEWS_START,
  SEND_REVIEW_ERROR,
  LOAD_OFFERS_ERROR,
  LOAD_REVIEWS_ERROR,
  CLEAR_USER,
} from "../actions/action-types";

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
  loadOffersError: false,
  isAppReady: false,

  user: JSON.parse(localStorage.getItem(`user`)) || null,
  activeCard: -1,

  isReviewSending: false,
  reviewSentSuccessfully: false,
  isReviewSendingError: false,

  isFetching: false,
  fetchError: null,

  reviews: [],
  isReviewsLoading: false,
  isReviewsLoadingError: false
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.city
      });
    case CHANGE_ACTIVE_CARD:
      return Object.assign({}, state, {
        activeCard: action.cardId
      });

    case LOAD_OFFERS_SUCCESS:
      return Object.assign({}, state, {
        loadOffersError: false,
        isAppReady: true,
        allOffers: action.offers
      });
    case LOAD_OFFERS_ERROR:
      return Object.assign({}, state, {
        loadOffersError: true
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });

    case CLEAR_USER:
      return Object.assign({}, state, {
        user: null
      });

    case LOAD_REVIEWS_START:
      return Object.assign({}, state, {
        isReviewsLoading: true,
        isReviewsLoadingError: false
      });
    case LOAD_REVIEWS_SUCCESS:
      return Object.assign({}, state, {
        reviews: action.reviews,
        isReviewsLoading: false
      });
    case LOAD_REVIEWS_ERROR:
      return Object.assign({}, state, {
        isReviewsLoading: false,
        isReviewsLoadingError: true
      });

    case SEND_REVIEW_START:
      return Object.assign({}, state, {
        isReviewSending: true,
        isReviewSendingError: false,
        reviewSentSuccessfully: false
      });
    case SEND_REVIEW_SUCCESS:
      return Object.assign({}, state, {
        isReviewSending: false,
        reviewSentSuccessfully: true
      });
    case SEND_REVIEW_ERROR:
      return Object.assign({}, state, {
        isReviewSending: false,
        reviewSentSuccessfully: false,
        isReviewSendingError: true
      });

    case FETCH_START:
      return Object.assign({}, state, {
        isFetching: true,
        fetchError: null
      });
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case FETCH_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        fetchError: action.payload
      });

    case POST_FAVORITE_SUCCESS:
      // TODO: прикрутить какой-нибудь deepStateCopy или наоборот реализовать immutableState, чтоб так не делать:
      const allOffers = [...state.allOffers];
      const index = allOffers.findIndex(
          (offer) => offer.id === action.payload.id
      );
      const hotelCopy = Object.assign({}, allOffers[index]);
      hotelCopy.isFavorite = action.payload.status;
      allOffers.splice(index, 1, hotelCopy);

      return Object.assign({}, state, {
        allOffers
      });
    /* case POST_FAVORITE_ERROR:
      return Object.assign({}, state, {
        allOffers
      }); */
  }
  return state;
};

export default appReducer;
