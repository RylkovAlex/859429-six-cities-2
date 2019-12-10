import * as React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookmarkButton from './bookmark-button';

configure({adapter: new Adapter()});

it(`BookmarkButton correctly handle click`, () => {
  const bookmarkClickHandler = jest.fn();

  const bookmarkButton = shallow(
      <BookmarkButton
        buttonClasses = {`place-card__bookmark-button button`}
        isFetching = {false}
        handleBookmarkClick = {bookmarkClickHandler}
      />
  );

  const button = bookmarkButton.find(`.button`);
  button.simulate(`click`);

  expect(bookmarkClickHandler).toHaveBeenCalledTimes(1);
});
