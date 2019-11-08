import appReducer, {appInitialState} from "./reducer";
import {CHANGE_CITY, GET_OFFERS} from "../actions/action-types";

describe(`appReducer works correctly`, () => {
  it(`reducer without additional parameters should return initial state`, () => {
    expect(appReducer(undefined, {})).toEqual(appInitialState);
  });
  it(`appReducer should change current city by a given value`, () => {
    expect(appReducer({
      city: ``,
      offers: [],
    }, {
      type: CHANGE_CITY,
      city: `NewCity`,
    })).toEqual({
      city: `NewCity`,
      offers: [],
    });
  });
  it(`appReducer should change current offers by a given value`, () => {
    expect(appReducer({
      city: `city`,
      offers: [],
    }, {
      type: GET_OFFERS,
      offers: [{city: {name: `city`}}, {city: {name: `city2`}}],
    })).toEqual({
      city: `city`,
      offers: [{city: {name: `city`}}],
    });
  });
});
