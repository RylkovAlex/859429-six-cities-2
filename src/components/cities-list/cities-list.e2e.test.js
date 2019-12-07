import * as React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CitiesList from './cities-list';
import {citiesMock} from '../../mocks/cities';

configure({adapter: new Adapter()});

it(`CitiesList correctly handle click`, () => {
  const cityClickHandler = jest.fn();

  const list = shallow(
      <CitiesList
        city={citiesMock[0]}
        cities={citiesMock}
        cityClickHandler={cityClickHandler}
      />
  );

  const citiesLinks = list.find(`.locations__item-link`);
  expect(citiesLinks).toHaveLength(2);
  const cityNameLink = citiesLinks.at(0);
  cityNameLink.simulate(`click`);

  expect(cityClickHandler).toHaveBeenCalledTimes(1);
});
