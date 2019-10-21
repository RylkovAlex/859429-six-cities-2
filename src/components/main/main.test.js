import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main';

it(`Main correctly renders after relaunch`, () => {
  const props = {
    cards: [{
      id: 0,
      isPremium: false,
      previewImage: `Some link`,
      price: 1,
      type: `SomeType`,
      title: `SomeTitle`,
    }]
  };

  const tree = renderer
    .create(<Main {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
