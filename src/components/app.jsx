import React from 'react';
import Main from './main/main.jsx';

const cards = ([
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
      cards = {cards}
    />
  );
};

export default App;
