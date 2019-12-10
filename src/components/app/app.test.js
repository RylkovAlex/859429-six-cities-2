import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {MemoryRouter} from 'react-router';
import {createNodeMock} from '../../utils/utils';
import {offersMock} from '../../mocks/offers';

// TODO: по-идее, мне нужен "чистый" компнент для тестов, т.е. я мокаю все его дочерние компоненты, но нет ли способа упростить эту процедуру? не писать же каждый раз такую простыню:
jest.mock(`../offer-page/offer-page.jsx`, () => () => <div/>);
jest.mock(`../main/main.jsx`, () => () => <div/>);
jest.mock(`../sign-in/sign-in.jsx`, () => () => <div/>);
jest.mock(`../favorrites/favorites.jsx`, () => () => <div/>);
jest.mock(`../../hocs/with-sorting-state/with-sorting-state.js`, () => () => <div/>);

it(`App correctly renders after relaunch`, () => {
  const props = {
    isAppReady: true,
    offersToShow: offersMock,
    loadOffers: jest.fn(),
    autoLogIn: jest.fn(),
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <App {...props} />
        </MemoryRouter>,
        {createNodeMock}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly return null if there aren't offers`, () => {
  const props = {
    isAppReady: false,
    offersToShow: [],
    loadOffers: jest.fn(),
    autoLogIn: jest.fn(),
  };

  const tree = renderer
    .create(
        <App {...props} />
    )
    .toJSON();

  expect(tree).toBe(null);
});
