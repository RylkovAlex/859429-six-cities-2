import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import withSortingState, {SortingType} from './with-sorting-state';
import {offersMock} from '../../mocks/offers';
Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => <div {...props}/>;

const MockComponentWrapped = withSortingState(MockComponent);
const wrapper = shallow(<MockComponentWrapped offersToSort={offersMock}/>);

it(`Sorting type by default is Popular`, () => {
  expect(wrapper.props().sortingType).toEqual(SortingType.Popular);
});

it(`Correctly changes sorting type`, () => {
  wrapper.props().sortOffers(SortingType.TopRated);
  expect(wrapper.props().sortingType).toEqual(SortingType.TopRated);
});

it(`Correctly sort offers`, () => {
  wrapper.props().sortOffers(SortingType.PriceHighToLow);
  let sortedOffers = wrapper.props().sortedOffers;
  expect(sortedOffers[0].price > sortedOffers[1].price).toBe(true);

  wrapper.props().sortOffers(SortingType.PriceLowToHight);
  sortedOffers = wrapper.props().sortedOffers;
  expect(sortedOffers[0].price < sortedOffers[1].price).toBe(true);
});
