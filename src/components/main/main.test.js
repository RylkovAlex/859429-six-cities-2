import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

it(`Main correctly renders after relaunch`, () => {
  const props = {
    offerCards: []
  };

  const tree = renderer
    .create(<Main {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
