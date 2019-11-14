import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import withSortingType from './with-sorting-type';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div/>;

const MockComponentWrapped = withSortingType(MockComponent);
const wrapper = mount(<MockComponentWrapped />);

it(`Type popular is default`, () => {
  expect(wrapper.state(`sortingType`)).toEqual(`Popular`);
});
