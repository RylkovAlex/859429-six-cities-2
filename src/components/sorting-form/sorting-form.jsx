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

// class SortingForm extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isListOpen: false,
//       sortingType: SortingType.Popular,
//     };
//     this._handleSortClick = this._handleSortClick.bind(this);
//     this._handleOptionClick = this._handleOptionClick.bind(this);
//   }

//   _handleSortClick() {
//     this.setState({
//       isListOpen: !this.state.isListOpen,
//     });
//   }

//   _handleOptionClick(type) {
//     if (type !== this.state.sortingType) {
//       this.props.sortOffersToShow(type);
//       this.setState({
//         sortingType: type,
//       });
//     }
//     this.setState({
//       isListOpen: !this.state.isListOpen,
//     });
//   }

//   render() {
//     return (
//       <form className="places__sorting" action="#" method="get">
//         <span className="places__sorting-caption">Sort by</span>
//         <span
//           className="places__sorting-type"
//           tabIndex="0"
//           onClick = {this._handleSortClick}
//         >
//           {this.state.sortingType}
//           <svg className="places__sorting-arrow" width="7" height="4">
//             <use xlinkHref="#icon-arrow-select"></use>
//           </svg>
//         </span>
//         {this.state.isListOpen &&
//         <SortingOptionsList
//           onOptionClick = {this._handleOptionClick }
//           activeOption = {this.state.sortingType}
//         />
//         }

//         {/* TODO: зачем этот select и как его использовать?! */}
//         {/* <select className="places__sorting-type" id="places-sorting">
//             <option className="places__option" value="popular">Popular</option>
//             <option className="places__option" value="to-high">Price: low to high</option>
//             <option className="places__option" value="to-low">Price: high to low</option>
//             <option className="places__option" value="top-rated">Top rated first</option>
//           </select> */}
//       </form>
//     );
//   }
// }

function SortingForm({sortOffersToShow}) {
  const [sortingType, setSortingType] = useState(SortingType.Popular);
  const [isListOpen, setListOpen] = useState(false);
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
};

export {SortingForm};

const mapDispatchToProps = (dispatch) => ({
  sortOffersToShow: (sortType) => dispatch(ActionCreator.sortOffersToShow(sortType)),
});

export default connect(null, mapDispatchToProps)(SortingForm);
