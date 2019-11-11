import ActionCreator from "./action-creator";
import {CHANGE_CITY, SET_OFFERS_TO_SHOW} from "../action-types";

describe(`Action creators work correctly`, () => {
  it(`ActionCreator.changeCity() returns correct action`, () => {
    expect(ActionCreator.changeCity({})).toEqual({
      type: CHANGE_CITY,
      city: {},
    });
  });
  it(`ActionCreator.setOffersToShow() returns correct action`, () => {
    expect(ActionCreator.setOffersToShow()).toEqual({
      type: SET_OFFERS_TO_SHOW,
    });
  });
});
