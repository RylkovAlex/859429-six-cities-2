import Enzyme, {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import {createStore} from 'redux';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import withAuth from './with-auth';
import appReducer from '../../redux/reducers/app-reducer';
import ActionCreator from '../../redux/actions/action-creator/action-creator';
Enzyme.configure({adapter: new Adapter()});

const store = createStore(appReducer);

const MockComponent = () => <div className = {`mock-component`}/>;
const MockComponentWrapped = withAuth(MockComponent);
let wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <MockComponentWrapped/>
      </MemoryRouter>
    </Provider>
);

it(`Don't render Component by default - there aren't user in store`, () => {
  const component = wrapper.find(`.mock-component`);
  expect(component).toHaveLength(0);
});

it(`Render Component if there are user in store`, () => {
  store.dispatch(ActionCreator.loginSuccess({
    name: `user`,
  }));
  wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MockComponentWrapped/>
        </MemoryRouter>
      </Provider>
  );

  const component = wrapper.find(`.mock-component`);
  expect(component).toHaveLength(1);
});
