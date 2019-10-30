import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';
import {MemoryRouter} from 'react-router';
import {offerCardForTests} from '../../prop-types/prop-types';
import {createNodeMock} from '../../utils/utils';


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
