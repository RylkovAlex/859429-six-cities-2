import {CHANGE_CITY, CHANGE_ACTIVE_CARD} from "../action-types";

const ActionCreator = {
  changeCity: (city) => ({
    type: CHANGE_CITY,
    city,
  }),

  changeActiveCard: (cardId) => ({
    type: CHANGE_ACTIVE_CARD,
    cardId,
  }),
};

export default ActionCreator;
