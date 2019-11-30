import React from 'react';
import PropTypes from 'prop-types';
import {SortingType} from '../hocs/withSortingState/with-sorting-state';

const SortingOptionsList = ({onOptionClick, activeOption}) => {
  const sortingTypes = Object.values(SortingType);
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {sortingTypes.map((type, i) => (
        <li
          className={`places__option ${type === activeOption ? `places__option--active` : ``}`}
          tabIndex="0"
          key = {`sort-option-${i}`}
          onClick = {() => onOptionClick(type)}
        >
          {type}
        </li>
      ))}
    </ul>
  );
};

SortingOptionsList.propTypes = {
  onOptionClick: PropTypes.func.isRequired,
  activeOption: PropTypes.string.isRequired,
};

export default SortingOptionsList;
