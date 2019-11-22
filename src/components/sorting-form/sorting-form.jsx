import React, {useEffect} from 'react';
import SortingOptionsList from '../sorting-options-list/sorting-options-list.jsx';
// import {compose} from 'redux';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/actions/action-creator/action-creator.js';
import PropTypes from 'prop-types';
import withSortingList from '../hocs/withSortingList/with-sorting-list.js';
import withSortingType from '../hocs/withSortingType/with-sorting-type.js';

function SortingForm({sortOffersToShow, isListOpen, setListOpen, sortingType, setSortingType}) {
  useEffect(() => {
    sortOffersToShow(sortingType);
  }, [sortingType]);

  const optionClickHandler = (type) => {
    if (type !== sortingType) {
      sortOffersToShow(sortingType);
      setSortingType(type);
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

      {/* TODO: зачем этот select и как его использовать?! */}
      {/* <select className="places__sorting-type" id="places-sorting">
          <option className="places__option" value="popular">Popular</option>
          <option className="places__option" value="to-high">Price: low to high</option>
          <option className="places__option" value="to-low">Price: high to low</option>
          <option className="places__option" value="top-rated">Top rated first</option>
        </select> */}
    </form>
  );
}

SortingForm.propTypes = {
  sortOffersToShow: PropTypes.func.isRequired,
  isListOpen: PropTypes.bool,
  setListOpen: PropTypes.func,
  sortingType: PropTypes.string,
  setSortingType: PropTypes.func,
};

export {SortingForm};

const mapDispatchToProps = (dispatch) => ({
  sortOffersToShow: (sortType) => dispatch(ActionCreator.sortOffersToShow(sortType)),
});


export default connect(null, mapDispatchToProps)(withSortingList(withSortingType(SortingForm)));

// TODO: подскажи почему так не работает:
// export default compose(
//     withSortingType(),
//     withSortingList(),
//     connect(null, mapDispatchToProps)
// )(SortingForm);
