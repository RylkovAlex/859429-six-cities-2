import React from 'react';
import Main from './main/main.jsx';

const places = ([
  {
    id: 1,
    isPremium: true,
    previewImage: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful & luxurious studio at great location`,
  },
  {
    id: 2,
    isPremium: true,
    previewImage: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful & luxurious studio at great location`,
  },
  {
    id: 3,
    isPremium: true,
    previewImage: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful & luxurious studio at great location`,
  },
  {
    id: 4,
    isPremium: true,
    previewImage: `img/apartment-01.jpg`,
    price: 120,
    type: `Apartment`,
    title: `Beautiful & luxurious studio at great location`,
  },
]);

const App = () => {
  return (
    <Main
      places = {places}
    />
  );
};

export default App;
