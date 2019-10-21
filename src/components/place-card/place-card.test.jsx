import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from './place-card';

it(`PlaceCard correctly renders after relaunch`, () => {
  const props = {
    id: 0,
    isPremium: false,
    previewImage: `Some link`,
    price: 1,
    type: `SomeType`,
    title: `SomeTitle`,
  };

  const tree = renderer
    .create(<PlaceCard {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
