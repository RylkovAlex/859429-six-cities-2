import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import FavoritesEmpty from './favorites-empty';

jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));

it(`FavoritesEmpty correctly renders after relaunch`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoritesEmpty/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
