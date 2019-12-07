import React from 'react';
import SortingOptionsList from '../sorting-options-list/sorting-options-list.jsx';
import PropTypes from 'prop-types';
import withSortingList from '../../hocs/with-sorting-list/with-sorting-list.js';

function SortingForm({isListOpen, setListOpen, sortingType, sortOffers}) {
  const optionClickHandler = (type) => {
    if (type !== sortingType) {
      sortOffers(type);
    }
    setListOpen(!isListOpen);
  };

  const sortClickHandler = () => setListOpen(!isListOpen);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick = {sortClickHandler}
      >
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isListOpen &&
      <SortingOptionsList
        onOptionClick = {optionClickHandler}
        activeOption = {sortingType}
      />
      }
    </form>
  );
}

SortingForm.propTypes = {
  sortOffers: PropTypes.func.isRequired,
  isListOpen: PropTypes.bool.isRequired,
  setListOpen: PropTypes.func.isRequired,
  sortingType: PropTypes.string.isRequired,
};

export {SortingForm};

export default withSortingList(SortingForm);
