import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {Favorites} from './favorites';
import {favoritesMock} from '../../mocks/offers';
import {citiesMock} from '../../mocks/cities';

jest.mock(`../header/header.jsx`, () => () => <div/>);
jest.mock(`../favorites-empty/favorites-empty.jsx`, () => () => <div/>);
jest.mock(`../offers-list/offers-list.jsx`, () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(<div/>),
  ListType: {
    MainList: `main`,
    NearbyList: `nearby`,
    FavoriteList: `favorite`,
  }
}));

it(`Favorites correctly renders after relaunch`, () => {
  const props = {
    favorites: favoritesMock,
    postFavorite: jest.fn(),
    activeCity: citiesMock[0],
    cities: citiesMock,
    setCity: jest.fn(),
  };
  const tree = renderer
    .create(
        <MemoryRouter>
          <Favorites {...props}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
