import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import PlaceCard from './place-card';

Enzyme.configure({adapter: new Adapter()});

it(`PlaceCard is correctly handle click`, () => {
  const onCardClickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    key = {0}
    isPremium = {false}
    previewImage = {` `}
    price = {0}
    type = {` `}
    title = {` `}
    onCardClickHandler = {onCardClickHandler}
  />);

  placeCard.simulate(`click`);

  expect(onCardClickHandler).toHaveBeenCalledTimes(1);
});
