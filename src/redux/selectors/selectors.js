import {createSelector} from 'reselect';

const MAX_CITIES = 6;

const getCityName = (state) => state.city.name;
const getAllOffers = (state) => state.allOffers;

export const getOffersToShow = createSelector(
    [getCityName, getAllOffers],
    (cityName, allOffers) => allOffers.filter((offer) => offer.city.name === cityName)
);

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
