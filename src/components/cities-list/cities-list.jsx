import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = ({city, cities, cityClickHandler}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((c, i) => (
        <li className="locations__item" key = {`city-${i}`}>
          <a className={`locations__item-link tabs__item ${city.name === c.name ? `tabs__item--active` : ``}`} href="#">
            <span onClick = {cityClickHandler}>{c.name}</span>
          </a>
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
