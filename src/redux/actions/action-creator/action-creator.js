import {CHANGE_CITY, GET_OFFERS, SORT_OFFERS, CHANGE_ACTIVE_CARD} from "../action-types";
import {SortingType} from "../../../components/sorting-form/sorting-form.jsx";

const ActionCreator = {
  changeCity: (city) => ({
    type: CHANGE_CITY,
    city,
  }),

  getOffers: (offers) => ({
    type: GET_OFFERS,
    offers,
  }),

  changeActiveCard: (cardId) => ({
    type: CHANGE_ACTIVE_CARD,
    cardId,
  }),

  sortOffers: (offers, sortType) => {
    switch (sortType) {
      case SortingType.Popular:
        // TODO: пока не знаю что здесь праильно возвращать, по-идее должно где-то значение по умолчанию хранится, думаю позже пойму как за ним на сервер сходить.
        return {
          type: GET_OFFERS,
          offers,
        };
      case SortingType.PriceHighToLow:
        return {
          type: SORT_OFFERS,
          offers: offers.sort((a, b) => b.price - a.price)
        };
      case SortingType.PriceLowToHight:
        return {
          type: SORT_OFFERS,
          offers: offers.sort((a, b) => a.price - b.price)
        };
      case SortingType.TopRated:
        return {
          type: SORT_OFFERS,
          offers: offers.sort((a, b) => b.rating - a.rating)
        };
    }
    return null;
  }
};

export default ActionCreator;
