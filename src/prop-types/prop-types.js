import PropTypes from 'prop-types';

export const offerCardPropTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitide: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
  }),
  id: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPro: PropTypes.bool,
    name: PropTypes.stringisRequired,
    avatarUrl: PropTypes.string,
  }),
  description: PropTypes.string,
  location: PropTypes.shape({
    latitide: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
  }),
};

export const reviewPropTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export const cityPropTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
};

export const offerCardForTests = {
  city: {
    name: ``,
    location: {
      latitude: 1,
      longitude: 1,
      zoom: 1,
    },
  },
  id: 0,
  previewImage: ``,
  images: [``],
  title: ``,
  isFavorite: false,
  isPremium: false,
  rating: 0,
  type: ``,
  bedrooms: 0,
  maxAdults: 0,
  price: 0,
  goods: [``],
  host: {
    id: 0,
    isPro: false,
    name: ``,
    avatarUrl: ``,
  },
  description: ``,
  location: {
    latitude: 1,
    longitude: 1,
    zoom: 1,
  },
};

export const reviewForTests = {
  id: 0,
  user: {
    id: 0,
    isPro: false,
    name: ``,
    avatarUrl: ``,
  },
  rating: 0,
  comment: ``,
  date: `Thu Nov 07 2019 13:56:54 GMT+0300 (Москва, стандартное время)`,
};
