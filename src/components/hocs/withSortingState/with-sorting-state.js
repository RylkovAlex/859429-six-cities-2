import React from 'react';
import PropTypes from 'prop-types';

export const SortingType = {
  Popular: `Popular`,
  PriceLowToHight: `Price: low to high`,
  PriceHighToLow: `Price: high to low`,
  TopRated: `Top rated first`,
};

const withSortingState = (Component) => {
  class WithSortingState extends React.PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.initialList === nextProps.offersToSort) {
        return {
          sortingType: prevState.sortingType,
        };
      }
      return {
        initialList: nextProps.offersToSort,
        list: nextProps.offersToSort,
        sortingType: SortingType.Popular,
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        initialList: this.props.offersToSort,
        list: this.props.offersToSort,
        sortingType: SortingType.Popular,
      };
      this.sortList = this.sortList.bind(this);
    }

    sortList(sortType) {
      let sortedList = [...this.state.list];
      switch (sortType) {
        case SortingType.Popular:
          this.setState({
            list: this.state.initialList,
            sortingType: SortingType.Popular,
          });
          return;
        case SortingType.PriceHighToLow:
          this.setState({
            list: sortedList.sort((a, b) => b.price - a.price),
            sortingType: SortingType.PriceHighToLow,
          });
          return;
        case SortingType.PriceLowToHight:
          this.setState({
            list: sortedList.sort((a, b) => a.price - b.price),
            sortingType: SortingType.PriceLowToHight,
          });
          return;
        case SortingType.TopRated:
          this.setState({
            list: sortedList.sort((a, b) => b.rating - a.rating),
            sortingType: SortingType.TopRated,
          });
          return;
        default:
          this.setState({
            list: this.state.initialList,
            sortingType: SortingType.Popular,
          });
          return;
      }
    }

    render() {
      return <Component
        {...this.props}
        sortedOffers = {this.state.list}
        sortOffers = {this.sortList}
        sortingType = {this.state.sortingType}
      />;
    }
  }

  WithSortingState.propTypes = {
    offersToSort: PropTypes.array,
  };
  return WithSortingState;
};

export default withSortingState;
