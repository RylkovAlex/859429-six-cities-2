import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../../prop-types/prop-types';
import {createNodeMock} from '../../utils/utils';

jest.mock(`../offers-list/offers-list.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../map/map.jsx`, () => jest.fn().mockReturnValue(null));

it(`Main correctly renders after relaunch`, () => {
  const props = {
    offerCards: [offerCardForTests]
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
