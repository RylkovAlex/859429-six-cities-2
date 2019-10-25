import React from 'react';
import Main from './main/main.jsx';
import PropTypes from 'prop-types';

const App = (props) => {
  const {offerCards} = props;

  return (
    <Main
      offerCards = {offerCards}
    />
  );
};

// TODO: надо ли так развёрнуто описывать Props'ы для тех компонентов, которые их не используют, а передают дальше?
App.propTypes = {
  offerCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.title,
  })),
};

export default App;
