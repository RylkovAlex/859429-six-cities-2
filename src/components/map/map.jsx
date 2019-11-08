import React from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import {offerCardPropTypes} from '../../prop-types/prop-types';

export default class Map extends React.PureComponent {
  static getDerivedStateFromProps(props) {
    return {
      points: props.points
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      points: props.points,
      isMount: false,
    };
    this._mapRef = React.createRef();

    this._city = this.state.points[0].city;
    this._cityCoords = [this._city.location.latitude, this._city.location.longitude];
    this._icon = L.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this._baseMap = L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    });
    this._hyddaMap = L.tileLayer(`https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png`, {
      maxZoom: 18,
      attribution: `Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
    });
    this._layers = L.control.layers({
      'Hydda Map': this._hyddaMap,
      'Base Map': this._baseMap,
    });
  }

  render() {
    if (this.state.isMount) {
      this._renderPoints();
    }
    return (
      React.cloneElement(this.props.children, {
        ref: this._mapRef
      })
    );
  }

  componentDidMount() {
    this._container = this._mapRef.current;
    this._map = L.map(this._container, {
      center: this._cityCoords,
      zoom: this._city.location.zoom,
      zoomControl: false,
      marker: true,
      layers: [this._baseMap, this._hyddaMap]
    });
    this._layers.addTo(this._map);
    this.setState({isMount: true});
  }

  _renderPoints() {
    this._city = this.state.points[0].city;
    this._cityCoords = [this._city.location.latitude, this._city.location.longitude];
    this._map.setView(this._cityCoords, this._city.location.zoom);
    const icon = this._icon;
    this.state.points.forEach((card) => {
      const cardCoords = [card.location.latitude, card.location.longitude];
      L.marker(cardCoords, {
        icon,
        title: card.title,
        alt: card.title,
      }).addTo(this._map);
    });
  }

}

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  children: PropTypes.node.isRequired,
};
