import React from 'react';
import {MemoryRouter} from 'react-router';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';
import {citiesMock, cityMock} from '../../mocks/cities';

it(`CitiesList correctly renders after relaunch`, () => {
  const props = {
    city: cityMock,
    cities: citiesMock,
    cityClickHandler: jest.fn(),
  };

  const tree = renderer
    .create(
        <MemoryRouter>
          <CitiesList {...props} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
