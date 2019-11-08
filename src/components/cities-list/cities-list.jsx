import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = ({city, cities, cityClickHandler}) => {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((c, i) => (
        <li className="locations__item" key = {`city-${i}`}>
          <a className={`locations__item-link tabs__item ${city === c ? `tabs__item--active` : ``}`} href="#">
            <span onClick = {cityClickHandler}>{c}</span>
          </a>
        </li>
      ))}
    </ul>

  );
};

CitiesList.propTypes = {
  city: PropTypes.string,
  cities: PropTypes.array,
  cityClickHandler: PropTypes.func,
};

export default CitiesList;
