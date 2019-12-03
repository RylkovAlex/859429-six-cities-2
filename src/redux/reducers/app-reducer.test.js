import appReducer, {appInitialState} from "./app-reducer";
import {CHANGE_CITY, LOAD_OFFERS_SUCCESS, FETCH_SUCCESS, FETCH_START} from "../actions/action-types";
import {createAPI} from "../../api/api";
import MockAdapter from "axios-mock-adapter";
import {Operation} from "../actions/action-creator/action-creator";

const offer1 = {
  city: {
    name: `Cologne`,
    location: {
      latitude: 50.938903,
      longitude: 6.966074,
      zoom: 10
    }
  },
  id: 5,
  previewImage: `/img/apartment-01.jpg`,
  images: [`/img/room.jpg`, `/img/apartment-01.jpg`, `/img/apartment-02.jpg`, `/img/apartment-03.jpg`, `/img/studio-01.jpg`, `/img/apartment-01.jpg`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: false,
  isPremium: true,
  rating: 3.5,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 10,
  goods: [`Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    id: 3,
    isPro: true,
    name: `Angelina4`,
    avatarUrl: `/img/avatar-angelina.jpg`,
  },
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 50.938903,
    longitude: 6.966074,
    zoom: 8
  },
};

const offer2 = {
  city: {
    name: `Paris`,
    location: {
      latitude: 48.851353,
      longitude: 2.341412,
      zoom: 10
    }
  },
  id: 6,
  previewImage: `/img/apartment-01.jpg`,
  images: [`/img/room.jpg`, `/img/apartment-01.jpg`, `/img/apartment-02.jpg`, `/img/apartment-03.jpg`, `/img/studio-01.jpg`, `/img/apartment-01.jpg`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: false,
  isPremium: true,
  rating: 1.5,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 100,
  goods: [`Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    id: 3,
    isPro: true,
    name: `Angelina4`,
    avatarUrl: `/img/avatar-angelina.jpg`,
  },
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 48.851353,
    longitude: 2.341412,
    zoom: 8
  },
};

const apiResponse = [
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

const apiOffers = [
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

describe(`appReducer works correctly`, () => {
  it(`reducer without additional parameters should return initial state`, () => {
    expect(appReducer(undefined, {})).toEqual(appInitialState);
  });
  it(`appReducer should change current city by a given value`, () => {
    expect(appReducer({
      city: {},
      allOffers: [],
    }, {
      type: CHANGE_CITY,
      city: {
        name: `Paris`,
      },
    })).toEqual({
      city: {
        name: `Paris`,
      },
      allOffers: [],
    });
  });

  it(`appReducer should correctly set allOffers after fetching them`, () => {
    expect(appReducer({
      allOffers: [],
      isAppReady: false,
    }, {
      type: LOAD_OFFERS_SUCCESS,
      offers: [offer1, offer2]
    })).toEqual({
      allOffers: [offer1, offer2],
      isAppReady: true,
    });
  });

  it(`Should make a correct API call to /hotels`, function () {
    const loginFail = jest.fn();
    const dispatch = jest.fn();
    const api = createAPI(loginFail, dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, apiResponse);

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
          offers: apiOffers,
        });
      });
  });
});
