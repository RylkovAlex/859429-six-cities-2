import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';

it(`App correctly renders after relaunch`, () => {
  const props = {
    offerCards: []
  };

  const tree = renderer
    .create(<App {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
