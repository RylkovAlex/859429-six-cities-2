import {CHANGE_CITY, SET_OFFERS_TO_SHOW, SORT_OFFERS_TO_SHOW, CHANGE_ACTIVE_CARD} from "../action-types";
import {SortingType} from "../../../components/sorting-form/sorting-form.jsx";

const ActionCreator = {
  changeCity: (city) => ({
    type: CHANGE_CITY,
    city,
  }),

  setOffersToShow: () => ({
    type: SET_OFFERS_TO_SHOW,
  }),

  changeActiveCard: (cardId) => ({
    type: CHANGE_ACTIVE_CARD,
    cardId,
  }),

  sortOffersToShow: (sortType) => {
    switch (sortType) {
      case SortingType.Popular:
        return {
          type: SET_OFFERS_TO_SHOW,
        };
      case SortingType.PriceHighToLow:
        return {
          type: SORT_OFFERS_TO_SHOW,
          sorting: (offers) => offers.sort((a, b) => b.price - a.price)
        };
      case SortingType.PriceLowToHight:
        return {
          type: SORT_OFFERS_TO_SHOW,
          sorting: (offers) => offers.sort((a, b) => a.price - b.price)
        };
      case SortingType.TopRated:
        return {
          type: SORT_OFFERS_TO_SHOW,
          sorting: (offers) => offers.sort((a, b) => b.rating - a.rating)
        };
    }
    return null;
  }
};

export default ActionCreator;
