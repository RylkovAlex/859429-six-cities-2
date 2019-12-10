import React from 'react';
import PropTypes from 'prop-types';

const BookmarkButton = ({buttonClasses, isFetching, handleBookmarkClick}) => (
  <button
    className={buttonClasses}
    type="button"
    disabled={isFetching}
    onClick={handleBookmarkClick}
  >
    <svg className="place-card__bookmark-icon" width="18" height="19">
      <use xlinkHref="#icon-bookmark"></use>
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);

BookmarkButton.propTypes = {
  buttonClasses: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
};

export default BookmarkButton;
