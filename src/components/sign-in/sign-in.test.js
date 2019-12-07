import React from 'react';
import renderer from 'react-test-renderer';
import {SignIn} from './sign-in';
import {MemoryRouter} from 'react-router';

jest.mock(`../header/header.jsx`, () => () => (<div/>));

it(`SignIn correctly renders after relaunch`, () => {
  const props = {
    setInput: jest.fn(),
    user: null,
    inputValues: {
      email: ``,
      password: ``,
    },
    logIn: jest.fn(),
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn {...props}/>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
