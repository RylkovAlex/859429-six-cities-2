import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../../prop-types/prop-types';
import {createNodeMock} from '../../utils/utils';

jest.mock(`../offers-list/offers-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map-component/map-component.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../sorting-form/sorting-form.jsx`, () => jest.fn().mockReturnValue(null));

it(`Main correctly renders after relaunch`, () => {
  const props = {
    activeCard: 0,
    offersToShow: [offerCardForTests],
    sortedOffers: [offerCardForTests],
    sortingType: ``,
    sortOffers: jest.fn(),
    cities: [],
    setCity: jest.fn(),
    setOffersToShow: jest.fn(),
    changeActiveCard: jest.fn(),
    postFavorite: jest.fn(),
    city: {},
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <Main {...props}/>
        </MemoryRouter>,
        {createNodeMock}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
