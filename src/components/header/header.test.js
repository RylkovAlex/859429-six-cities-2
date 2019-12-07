import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import {Header} from './header';

it(`Header correctly renders after relaunch`, () => {
  const props = {
    isAuthorized: true,
    user: {
      id: 1,
      email: `Oliver.conner@gmail.com`,
      name: `Oliver.conner`,
      avatarUrl: `img/1.png`,
      isPro: false
    },
  };
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header {...props}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
