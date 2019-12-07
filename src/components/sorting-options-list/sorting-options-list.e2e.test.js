import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {SortingType} from '../../hocs/with-sorting-state/with-sorting-state';
import SortingOptionsList from './sorting-options-list';

Enzyme.configure({adapter: new Adapter()});

it(`SortingOptionsList is correctly change sortingType`, () => {
  const optionClickHandler = jest.fn();
  const sortingTypes = Object.values(SortingType);

  const optionList = shallow(<SortingOptionsList
    onOptionClick = {optionClickHandler}
    activeOption = {SortingType.Popular}
  />);

  const firstOption = optionList.find(`.places__option`).at(0);
  firstOption.simulate(`click`);
  expect(optionClickHandler).toHaveBeenCalledWith(sortingTypes[0]);
});
