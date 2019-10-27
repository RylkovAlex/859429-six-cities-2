import React from 'react';
import renderer from 'react-test-renderer';
import OfferPage from './offer-page';

it(`OfferPage correctly renders after relaunch`, () => {
  const props = {
    card: {
      images: [``],
      title: `PropTypes.string`,
      isPremium: true,
      rating: 0,
      type: `PropTypes.string`,
      bedrooms: 0,
      maxAdults: 0,
      price: 0,
      goods: [``],
      host: {
        id: 0,
        isPro: true,
        name: ``,
        avtarUrl: ``,
      },
      description: ``,
    }
  };

  const tree = renderer
    .create(<OfferPage {...props}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
