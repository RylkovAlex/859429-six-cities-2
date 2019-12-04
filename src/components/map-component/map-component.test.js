import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import MapComponent from './map-component';

Enzyme.configure({adapter: new Adapter()});

it(`MapComponent renders after relaunch`, () => {
  const props = {
    config: {
      center: [0, 0],
      zoom: 0,
      points: [
        {
          position: [0, 0],
          id: 0,
        }
      ]
    },
    activePointId: 0,
  };

  const tree = shallow(<MapComponent {...props}/>);
  expect(toJson(tree)).toMatchSnapshot();

});
