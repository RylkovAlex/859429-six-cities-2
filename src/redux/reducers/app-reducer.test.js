import appReducer, {appInitialState} from "./app-reducer";
import {CHANGE_CITY, SET_OFFERS_TO_SHOW} from "../actions/action-types";

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

describe(`appReducer works correctly`, () => {
  it(`reducer without additional parameters should return initial state`, () => {
    expect(appReducer(undefined, {})).toEqual(appInitialState);
  });
  it(`appReducer should change current city by a given value`, () => {
    expect(appReducer({
      city: {},
      offers: [],
    }, {
      type: CHANGE_CITY,
      city: {
        name: `Paris`,
      },
    })).toEqual({
      city: {
        name: `Paris`,
      },
      offers: [],
    });
  });

  it(`appReducer should correctly change offersToShow`, () => {
    expect(appReducer({
      city: {
        name: `Paris`,
      },
      allOffers: [offer1, offer2],
      offersToShow: [],
    }, {
      type: SET_OFFERS_TO_SHOW,
    })).toEqual({
      city: {
        name: `Paris`,
      },
      allOffers: [offer1, offer2],
      offersToShow: [offer2],
    });
  });
});
