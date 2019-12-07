import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {SignIn} from './sign-in';

Enzyme.configure({adapter: new Adapter()});

it(`SignIn is correctly handle inputs changes and submit event`, () => {
  const inputValues = {
    email: ``,
    password: ``,
  };

  const changeInputHandler = jest.fn((inputName, value) => {
    inputValues[inputName] = value;
  });

  const submitHandler = jest.fn();
  const signIn = shallow(<SignIn
    setInput = {changeInputHandler}
    user = {null}
    inputValues = {inputValues}
    logIn = {submitHandler}
  />);

  const inputs = signIn.find(`.login__input`);
  const emailInput = inputs.at(0);
  const passwordInput = inputs.at(1);

  const mockChangeEvent = {
    preventDefault: () => {},
    target: {
      value: `email@mail.ru`,
    },
  };

  emailInput.simulate(`change`, mockChangeEvent);
  expect(changeInputHandler).toHaveBeenCalledWith(`email`, mockChangeEvent.target.value);

  mockChangeEvent.target.value = `12345`;
  passwordInput.simulate(`change`, mockChangeEvent);
  expect(changeInputHandler).toHaveBeenCalledWith(`password`, mockChangeEvent.target.value);

  const submitButton = signIn.find(`.login__submit`);
  const mockClickEvent = {
    preventDefault: () => {},
  };
  submitButton.simulate(`click`, mockClickEvent);
  expect(submitHandler).toHaveBeenCalledWith({
    email: `email@mail.ru`,
    password: `12345`,
  });
});
