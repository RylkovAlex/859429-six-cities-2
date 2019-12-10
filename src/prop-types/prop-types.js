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
