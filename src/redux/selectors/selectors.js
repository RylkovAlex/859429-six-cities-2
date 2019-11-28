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
      let cities = allOffers.map((offer) => JSON.stringify(offer.city));
      cities = Array.from(new Set(cities));
      cities = (cities.length > MAX_CITIES) ? cities.slice(0, MAX_CITIES) : cities;
      cities = cities.map((city) => JSON.parse(city));
      return cities;
    }
);
