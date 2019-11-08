import {CHANGE_CITY, GET_OFFERS} from "../actions/action-types";

// TODO: имеет ли смысл хранить в store вообще все карточки (сейчас я храню лишь те, что нужно рендерить, но выходит экшен GET_OFFERS должен получать все в параметре, чтоб положить в store нужные)
export const appInitialState = {
  city: ``,
  offers: [],
};

const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case CHANGE_CITY: return Object.assign({}, state, {
      city: action.city,
    });
    case GET_OFFERS: return Object.assign({}, state, {
      offers: action.offers.filter((offer) => offer.city.name === state.city), // TODO: куда эту логику лучше вынести? думал в экшен-креатор, но здесь есть зависимость от state.city ...
    });
  }
  return state;
};

export default appReducer;
