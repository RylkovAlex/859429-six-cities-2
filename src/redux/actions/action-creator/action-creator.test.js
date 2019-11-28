import ActionCreator from "./action-creator";
import {CHANGE_CITY} from "../action-types";

describe(`Action creators work correctly`, () => {
  it(`ActionCreator.changeCity() returns correct action`, () => {
    expect(ActionCreator.changeCity({})).toEqual({
      type: CHANGE_CITY,
      city: {},
    });
  });
});
