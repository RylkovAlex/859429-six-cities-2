import {CHANGE_CITY, GET_OFFERS, SORT_OFFERS, CHANGE_ACTIVE_CARD} from "../actions/action-types";

// TODO: имеет ли смысл хранить в store вообще все карточки (сейчас я храню лишь те, что нужно рендерить, но выходит экшен GET_OFFERS должен получать все карточки в параметре, чтоб положить в store нужные)
// TODO: нужно ли в appInitialState сразу класть город по умолчанию или лучше это делать внутри компонента app, как сейчас?
export const appInitialState = {
  city: ``,
  offers: [],
  activeCard: -1,
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case CHANGE_CITY: return Object.assign({}, state, {
      city: action.city,
    });
    case GET_OFFERS:
      return Object.assign({}, state, {
        offers: action.offers.filter((offer) => offer.city.name === state.city), // TODO: куда эту логику лучше вынести? думал в экшен-креатор, но здесь есть зависимость от state.city ...
      });
    case SORT_OFFERS: return Object.assign({}, state, {
      offers: action.offers,
    });
    case CHANGE_ACTIVE_CARD: return Object.assign({}, state, {
      activeCard: action.cardId,
    });
  }
  return state;
};

export default appReducer;
