import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import withSortingList from './with-sorting-list';
Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;

const MockComponentWrapped = withSortingList(MockComponent);
const wrapper = mount(<MockComponentWrapped />);

it(`Hide by default`, () => {
  expect(wrapper.state(`isListOpen`)).toEqual(false);
});
