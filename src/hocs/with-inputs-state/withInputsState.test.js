import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import withInputsState from './withInputsState';
Enzyme.configure({adapter: new Adapter()});

const MockComponent = (props) => <div {...props}/>;
const MockComponentWrapped = withInputsState(MockComponent, [`input1`, `input2`]);
const wrapper = shallow(<MockComponentWrapped/>);

it(`Inputs value by default is ''`, () => {
  expect(wrapper.props().inputValues).toEqual({
    input1: ``,
    input2: ``,
  });
});

it(`Correctly set input value`, () => {
  wrapper.props().setInput(`input1`, `someValue`);
  expect(wrapper.props().inputValues).toEqual({
    input1: `someValue`,
    input2: ``,
  });
});
