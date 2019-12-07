import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import withSortingList from './with-sorting-list';
Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => <div {...props}/>;

const MockComponentWrapped = withSortingList(MockComponent);
const wrapper = shallow(<MockComponentWrapped/>);
it(`List hide by default`, () => {
  expect(wrapper.props().isListOpen).toEqual(false);
});

it(`List state changes by using prop setListOpen`, () => {
  wrapper.props().setListOpen(true);
  expect(wrapper.props().isListOpen).toEqual(true);
});
