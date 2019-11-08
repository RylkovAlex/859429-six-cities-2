import ActionCreator from "./action-creator";
import {CHANGE_CITY, GET_OFFERS} from "../action-types";

describe(`Action creators work correctly`, () => {
  it(`ActionCreator.changeCity() returns correct action`, () => {
    expect(ActionCreator.changeCity(`newCity`)).toEqual({
      type: CHANGE_CITY,
      city: `newCity`,
    });
  });
  it(`ActionCreator.getOffers() returns correct action`, () => {
    expect(ActionCreator.getOffers([`offer`])).toEqual({
      type: GET_OFFERS,
      offers: [`offer`],
    });
  });
});
