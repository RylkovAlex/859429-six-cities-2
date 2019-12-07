import * as React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Favorites} from './favorites';
import {favoritesMock} from '../../mocks/offers';
import {citiesMock} from '../../mocks/cities';

configure({adapter: new Adapter()});

it(`Favorites correctly handle click`, () => {
  const cityClickHandler = jest.fn();

  const list = shallow(
      <Favorites
        favorites = {favoritesMock}
        postFavorite = {jest.fn()}
        activeCity = {citiesMock[0]}
        cities = {citiesMock}
        setCity = {cityClickHandler}
      />
  );

  const citiesLinks = list.find(`.locations__item-link`);
  const cityNameLink = citiesLinks.at(0);
  cityNameLink.simulate(`click`);

  expect(cityClickHandler).toHaveBeenCalledTimes(1);
});
