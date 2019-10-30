import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../prop-types/prop-types';
import {createNodeMock} from '../utils/utils';

it(`App correctly renders after relaunch`, () => {
  const props = {
    offerCards: [offerCardForTests]
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <App {...props}/>
        </MemoryRouter>,
        {createNodeMock}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
