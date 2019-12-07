import React from 'react';
import renderer from 'react-test-renderer';
import {SortingType} from '../../hocs/with-sorting-state/with-sorting-state';
import SortingOptionsList from './sorting-options-list';

it(`SortingOptionsList correctly renders after relaunch`, () => {
  const props = {
    onOptionClick: jest.fn(),
    activeOption: SortingType.Popular,
  };

  const tree = renderer
    .create(
        <SortingOptionsList {...props}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
