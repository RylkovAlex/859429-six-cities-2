import {createSelector} from 'reselect';

const MAX_CITIES = 6;

const getCityName = (state) => state.city.name;
const getAllOffers = (state) => state.allOffers;

export const getOffersToShow = createSelector(
    [getCityName, getAllOffers],
    (cityName, allOffers) => allOffers.filter((offer) => offer.city.name === cityName)
);

export const getMapConfig = (offers) => {
  const zoom = offers[0].city.location.zoom;
  const center = [offers[0].city.location.latitude, offers[0].city.location.longitude];
  const points = offers.map((offer) => ({
    position: [offer.location.latitude, offer.location.longitude],
    id: offer.id,
  }));
  return ({
    zoom,
    center,
    points,
  });
};

export const getCities = createSelector(
    [getAllOffers],
    (allOffers) => {
      // TODO: break reduce if acc.names.length === MAX_CITIES
      const cities = allOffers.reduce((acc, offer) => {
        if (acc.names.includes(offer.city.name) || acc.names.length === MAX_CITIES) {
          return acc;
        }
        acc.names.push(offer.city.name);
        acc.cities.push(offer.city);
        return acc;
      }, {names: [], cities: []});
      return cities.cities;
    }
);

export const getNearbyCards = (cardId, state) => {
  const cityName = state.city.name;
  const allOffers = state.allOffers;
  return allOffers.filter(
      (offer) => offer.city.name === cityName && offer.id !== cardId
  );
};

export const getFavorites = createSelector(
    [getAllOffers, getCities],
    (allOffers, allCities) => {
      const favorites = {};
      allCities.forEach((city) => {
        favorites[city.name] = [];
      });
      allOffers.forEach((offer) => {
        if (offer.isFavorite) {
          favorites[offer.city.name].push(offer);
        }
      });
      return Object.entries(favorites).map((group) => ({
        city: group[0],
        hotels: group[1],
      }));
    }
);
