import React from 'react';

export const SortingType = {
  Popular: `Popular`,
  PriceLowToHight: `Price: low to high`,
  PriceHighToLow: `Price: high to low`,
  TopRated: `Top rated first`,
};

const withSortingType = (Component) => {
  class WithSortingType extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        sortingType: SortingType.Popular,
      };
    }
    render() {
      const {sortingType} = this.state;
      return <Component
        {...this.props}
        sortingType = {sortingType}
        setSortingType = {(type) => this.setState({sortingType: type})}
      />;
    }
  }

  WithSortingType.propTypes = {};
  return WithSortingType;
};

export default withSortingType;
