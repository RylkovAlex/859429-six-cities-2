import React from 'react';
import L from 'leaflet';
import PropTypes from 'prop-types';
import {offerCardPropTypes} from '../../prop-types/prop-types';

export default class Map extends React.PureComponent {
  constructor(proops) {
    super(proops);
    this._mapRef = React.createRef();

    this._cards = this.props.cards || [];
    this._city = this._cards[0].city || `Amsterdam`;
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
    return (
      <section
        className="cities__map map"
        id="map"
        ref={this._mapRef}
      >

      </section>
    );
  }

  componentDidMount() {
    const container = this._mapRef.current;
    const map = L.map(container, {
      center: this._cityCoords,
      zoom: this._city.location.zoom,
      zoomControl: false,
      marker: true,
      layers: [this._baseMap, this._hyddaMap]
    });
    map.setView(this._cityCoords, this._city.location.zoom);

    this._layers.addTo(map);
    const icon = this._icon;
    this._cards.forEach((card) => {
      const cardCoords = [card.location.latitude, card.location.longitude];
      L.marker(cardCoords, {
        icon,
        title: card.title,
        alt: card.title,
      }).addTo(map);
    });
  }

}

Map.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
};
