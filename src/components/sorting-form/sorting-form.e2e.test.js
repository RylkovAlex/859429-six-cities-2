import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {SortingForm} from './sorting-form';
import {SortingType} from '../../hocs/with-sorting-state/with-sorting-state';

Enzyme.configure({adapter: new Adapter()});

jest.mock(`../sorting-options-list/sorting-options-list.jsx`, () => () => (<div/>));

it(`SortingForm is correctly open/close SortTypeList by click on SortButton`, () => {
  let isListOpen = false;
  const setListOpen = jest.fn(() => {
    isListOpen = !isListOpen;
  });

  const sortingForm = shallow(<SortingForm
    sortOffers = {jest.fn()}
    isListOpen = {isListOpen}
    setListOpen = {setListOpen}
    sortingType = {SortingType.Popular}
  />);

  const sortButton = sortingForm.find(`.places__sorting-type`);

  sortButton.simulate(`click`);
  expect(setListOpen).toHaveBeenCalledTimes(1);
  expect(isListOpen).toBe(true);

  sortButton.simulate(`click`);
  expect(setListOpen).toHaveBeenCalledTimes(2);
  expect(isListOpen).toBe(false);

});
