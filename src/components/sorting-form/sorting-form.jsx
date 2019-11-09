import React, {useState, useEffect} from 'react';
import SortingOptionsList from '../sorting-options-list/sorting-options-list.jsx';
import {connect} from 'react-redux';
import ActionCreator from '../../redux/actions/action-creator/action-creator.js';
import PropTypes from 'prop-types';

export const SortingType = {
  Popular: `Popular`,
  PriceLowToHight: `Price: low to high`,
  PriceHighToLow: `Price: high to low`,
  TopRated: `Top rated first`,
};

function SortingForm({offers, sortOffers}) {
  const [sortingType, setSortingType] = useState(SortingType.Popular);
  const [isListOpen, setListOpen] = useState(false);
  // TODO: почему-то компонент с карточками очень медленно реагирует на изменение в сторе, которое я отсюда прокидываю... т.е. он обновляется секунд через 5-10, как исправить?!
  useEffect(() => {
    sortOffers(offers, sortingType);
  }, [sortingType]);

  const optionClickHandler = (type) => {
    if (type !== sortingType) {
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
  offers: PropTypes.array.isRequired,
  sortOffers: PropTypes.func.isRequired,
};

export {SortingForm};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  sortOffers: (offers, sortType) => dispatch(ActionCreator.sortOffers(offers, sortType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingForm);
