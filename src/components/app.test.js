import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {MemoryRouter} from 'react-router';

it(`App correctly renders after relaunch`, () => {
  const props = {
    offerCards: []
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <App {...props}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
