import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const CitiesList = ({city, cities, cityClickHandler}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((c, i) => (
        <li className="locations__item" key={`city-${i}`}>
          <Link to="/"
            className={`locations__item-link tabs__item ${
              city.name === c.name ? `tabs__item--active` : ``
            }`}
            onClick={cityClickHandler}
          >
            <span>{c.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  city: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  cityClickHandler: PropTypes.func.isRequired,
};

export default CitiesList;
