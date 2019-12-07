import React from 'react';
import renderer from 'react-test-renderer';
import {SortingForm} from './sorting-form';
import {SortingType} from '../../hocs/with-sorting-state/with-sorting-state';

it(`SortingForm correctly renders after relaunch`, () => {
  const props = {
    sortOffers: jest.fn(),
    isListOpen: false,
    setListOpen: jest.fn(),
    sortingType: SortingType.Popular,
  };

  const tree = renderer
    .create(
        <SortingForm {...props}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
