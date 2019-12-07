import React from 'react';
import renderer from 'react-test-renderer';
import {Main} from './main';
import {MemoryRouter} from 'react-router';
import {createNodeMock} from '../../utils/utils';
import {offersMock} from '../../mocks/offers';
import {citiesMock} from '../../mocks/cities';

jest.mock(`../offers-list/offers-list.jsx`, () => () => <div/>);
jest.mock(`../header/header.jsx`, () => () => <div/>);
jest.mock(`../cities-list/cities-list.jsx`, () => () => <div/>);
jest.mock(`../sorting-form/sorting-form.jsx`, () => () => <div/>);
jest.mock(`../main-empty/main-empty.jsx`, () => () => <div/>);
jest.mock(`../map-component/map-component.jsx`, () => () => <div/>);

it(`Main correctly renders after relaunch`, () => {
  const props = {
    activeCard: 0,
    offersToShow: offersMock,
    sortedOffers: offersMock,
    sortingType: ``,
    sortOffers: jest.fn(),
    cities: citiesMock,
    setCity: jest.fn(),
    setOffersToShow: jest.fn(),
    changeActiveCard: jest.fn(),
    postFavorite: jest.fn(),
    city: citiesMock[0],
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
