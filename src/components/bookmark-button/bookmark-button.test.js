import React from 'react';
import renderer from 'react-test-renderer';
import BookmarkButton from './bookmark-button';

it(`BookmarkButton correctly renders after relaunch`, () => {
  const props = {
    buttonClasses: `css classes`,
    isFetching: false,
    handleBookmarkClick: jest.fn(),
  };

  const tree = renderer.create(<BookmarkButton {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});
