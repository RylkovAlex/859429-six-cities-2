import React from 'react';

const withSortingList = (Component) => {
  class WithSortingList extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isListOpen: false,
      };
    }
    render() {
      const {isListOpen} = this.state;
      return <Component
        {...this.props}
        isListOpen = {isListOpen}
        setListOpen = {(bool) => this.setState({isListOpen: bool})}
      />;
    }
  }

  WithSortingList.propTypes = {};
  return WithSortingList;
};

export default withSortingList;
