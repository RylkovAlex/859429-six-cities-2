import appReducer, {appInitialState} from "./app-reducer";
import {CHANGE_CITY, LOAD_OFFERS_SUCCESS, FETCH_SUCCESS, FETCH_START, LOAD_REVIEWS_SUCCESS, LOAD_REVIEWS_START, CHANGE_ACTIVE_CARD, LOAD_OFFERS_ERROR, LOGIN_SUCCESS, CLEAR_USER, SEND_REVIEW_START, SEND_REVIEW_SUCCESS, POST_FAVORITE_SUCCESS} from "../actions/action-types";
import {createAPI} from "../../api/api";
import MockAdapter from "axios-mock-adapter";
import {Operation} from "../actions/action-creator/action-creator";
import {offersMock} from "../../mocks/offers";
import {reviewsMock} from "../../mocks/reviews";

describe(`appReducer works correctly`, () => {
  it(`reducer without additional parameters should return initial state`, () => {
    expect(appReducer(undefined, {})).toEqual(appInitialState);
  });

  it(`appReducer should change current city by a given value`, () => {
    const prevState = Object.assign(appInitialState, {
      city: {},
    });
    const newState = Object.assign(prevState, {
      city: {
        name: `Paris`,
      },
    });

    expect(appReducer(prevState, {
      type: CHANGE_CITY,
      city: {
        name: `Paris`,
      },
    })).toEqual(newState);
  });

  it(`appReducer should change activeCard by a given value`, () => {
    const prevState = Object.assign(appInitialState, {
      activeCard: 1,
    });
    const newState = Object.assign(prevState, {
      activeCard: 2,
    });

    expect(appReducer(prevState, {
      type: CHANGE_ACTIVE_CARD,
      cardId: 2,
    })).toEqual(newState);
  });

  it(`Should make a correct API call to /hotels`, function () {
    const apiOffersResponse = [
      {
        id: 1,
        city: {
          name: `Amsterdam`,
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10
          }
        },
        // eslint-disable-next-line camelcase
        preview_image: `img/1.png`,
        images: [`img/1.png`, `img/2.png`],
        title: `Beautiful & luxurious studio at great location`,
        // eslint-disable-next-line camelcase
        is_favorite: false,
        // eslint-disable-next-line camelcase
        is_premium: false,
        rating: 4.8,
        type: `apartment`,
        bedrooms: 3,
        // eslint-disable-next-line camelcase
        max_adults: 4,
        price: 120,
        goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        host: {
          id: 3,
          // eslint-disable-next-line camelcase
          is_pro: true,
          name: `Angelina`,
          // eslint-disable-next-line camelcase
          avatar_url: `img/1.png`
        },
        description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8
        }
      }
    ];

    const mockOffers = [
      {
        id: 1,
        city: {
          name: `Amsterdam`,
          location: {
            latitude: 52.370216,
            longitude: 4.895168,
            zoom: 10
          }
        },
        previewImage: `img/1.png`,
        images: [`img/1.png`, `img/2.png`],
        title: `Beautiful & luxurious studio at great location`,
        isFavorite: false,
        isPremium: false,
        rating: 4.8,
        type: `apartment`,
        bedrooms: 3,
        maxAdults: 4,
        price: 120,
        goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
        host: {
          id: 3,
          isPro: true,
          name: `Angelina`,
          avatarUrl: `img/1.png`
        },
        description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8
        }
      }
    ];

    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, apiOffersResponse);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: FETCH_SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: LOAD_OFFERS_SUCCESS,
          offers: mockOffers,
        });
      });
  });

  it(`appReducer should correctly set allOffers after fetching them`, () => {
    const prevState = Object.assign(appInitialState, {
      allOffers: [],
      isAppReady: false,
      loadOffersError: false,
    });

    const newState = Object.assign(prevState, {
      allOffers: offersMock,
      isAppReady: true,
    });

    expect(appReducer(prevState, {
      type: LOAD_OFFERS_SUCCESS,
      offers: offersMock
    })).toEqual(newState);
  });

  it(`appReducer should correctly set offers loading error`, () => {
    const prevState = Object.assign(appInitialState, {
      loadOffersError: false,
    });
    const newState = Object.assign(prevState, {
      loadOffersError: true,
    });

    expect(appReducer(prevState, {
      type: LOAD_OFFERS_ERROR,
    })).toEqual(newState);
  });

  it(`Should make a correct API call to /login`, function () {
    const apiUserResponse = {
      // eslint-disable-next-line camelcase
      avatar_url: `/static/avatar/2.jpg`,
      email: `user@gmail.com`,
      id: 1,
      // eslint-disable-next-line camelcase
      is_pro: false,
      name: `User`,
      password: `12345`
    };

    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const sendAuthData = Operation.sendAuthData({
      email: `user@gmail.com`,
      password: `12345`
    });

    apiMock
      .onPost(`/login`)
      .reply(200, apiUserResponse);

    return sendAuthData(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: FETCH_SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: LOGIN_SUCCESS,
          user: apiUserResponse,
        });
      });
  });

  it(`appReducer should correctly set user's data`, () => {
    const mockUser = {
      avatarUrl: `/static/avatar/2.jpg`,
      email: `user@gmail.com`,
      id: 1,
      isPro: false,
      name: `User`,
    };

    const prevState = Object.assign(appInitialState, {
      user: null,
    });

    const newState = Object.assign(prevState, {
      user: mockUser,
    });

    expect(appReducer(prevState, {
      type: LOGIN_SUCCESS,
      user: mockUser
    })).toEqual(newState);
  });

  it(`appReducer should correctly clear user's data`, () => {
    const mockUser = {
      avatarUrl: `/static/avatar/2.jpg`,
      email: `user@gmail.com`,
      id: 1,
      isPro: false,
      name: `User`,
    };

    const prevState = Object.assign(appInitialState, {
      user: mockUser,
    });

    const newState = Object.assign(prevState, {
      user: null,
    });

    expect(appReducer(prevState, {
      type: CLEAR_USER,
    })).toEqual(newState);
  });

  it(`Should make a correct API call to /comments`, function () {
    const apiReviewsResponse = [
      {
        id: 1,
        user: {
          id: 4,
          // eslint-disable-next-line camelcase
          is_pro: false,
          name: `Max`,
          // eslint-disable-next-line camelcase
          avatar_url: `img/1.png`
        },
        rating: 4,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        date: `2019-05-08T14:13:56.569Z`
      }
    ];

    const mockReviews = [
      {
        id: 1,
        user: {
          id: 4,
          isPro: false,
          name: `Max`,
          avatarUrl: `img/1.png`
        },
        rating: 4,
        comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
        date: `2019-05-08T14:13:56.569Z`
      }
    ];

    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const hotelId = 1;
    const reviewsLoader = Operation.loadReviews(hotelId);

    apiMock
      .onGet(`/comments/${hotelId}`)
      .reply(200, apiReviewsResponse);

    return reviewsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: LOAD_REVIEWS_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: FETCH_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: FETCH_SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: LOAD_REVIEWS_SUCCESS,
          reviews: mockReviews,
        });
      });
  });

  it(`Should correctly set reviews data, after loading them`, () => {
    const prevState = Object.assign(appInitialState, {
      reviews: [],
    });

    const newState = Object.assign(prevState, {
      reviews: reviewsMock,
    });

    expect(appReducer(prevState, {
      type: LOAD_REVIEWS_SUCCESS,
      reviews: reviewsMock,
    })).toEqual(newState);
  });

  it(`Should make a correct API post request to /comments`, function () {
    const mockReview = reviewsMock[0];
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const hotelId = 1;
    const sendReview = Operation.sendReview(mockReview, hotelId);

    apiMock
      .onPost(`/comments/${hotelId}`)
      .reply(200);

    return sendReview(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: SEND_REVIEW_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: FETCH_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: FETCH_SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: SEND_REVIEW_SUCCESS,
        });
      });
  });

  it(`Should make a correct API post request to /favorites`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const hotelId = 1;
    const postFavorite = Operation.postFavorite(hotelId, true);

    apiMock
      .onPost(`favorite/${hotelId}/1`)
      .reply(200);

    return postFavorite(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FETCH_START,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: FETCH_SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: POST_FAVORITE_SUCCESS,
          payload: {
            id: hotelId,
            status: true,
          }
        });
      });
  });
});
