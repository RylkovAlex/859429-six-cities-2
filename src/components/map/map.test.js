import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map';
import {offerCardForTests} from '../../prop-types/prop-types';
import {createNodeMock} from '../../utils/utils';

it(`Map correctly renders after relaunch`, () => {
  const props = {
    cards: [offerCardForTests]
  };

  const tree = renderer
    .create(<Map {...props}/>, {createNodeMock})
    .toJSON();

  expect(tree).toMatchSnapshot();

});
