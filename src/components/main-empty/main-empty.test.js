import React from 'react';
import renderer from 'react-test-renderer';
import MainEmpty from './main-empty';

it(`MainEmpty correctly renders after relaunch`, () => {
  const props = {};

  const tree = renderer
    .create(<MainEmpty {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
