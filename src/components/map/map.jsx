import React from 'react';
import L from 'leaflet';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {offerCardPropTypes} from '../../prop-types/prop-types';
import {getOffersToShow} from '../../redux/selectors/selectors';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    // TODO: как здесь можно переписать логику и избавиться от стейта, чтоб не делать отдельный HOC под это дело?
    this.state = {
      isMount: false,
    };
    this._mapRef = React.createRef();

    this._city = this.props.points[0].city;
    this._cityCoords = [this._city.location.latitude, this._city.location.longitude];
    this._icon = L.icon({
      iconUrl: `/img/pin.svg`,
    });
    this._iconActive = L.icon({
      iconUrl: `/img/pin-active.svg`,
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

  componentDidMount() {
    this._container = this._mapRef.current;
    this._map = L.map(this._container, {
      center: this._cityCoords,
      zoom: this._city.location.zoom,
      zoomControl: false,
      marker: true,
      layers: [this._baseMap, this._hyddaMap]
    });
    this._markerGroup = L.layerGroup().addTo(this._map);
    this._layers.addTo(this._map);
    this.setState({isMount: true});
  }

  _renderPoints() {
    this._city = this.props.points[0].city;
    this._cityCoords = [this._city.location.latitude, this._city.location.longitude];
    this._map.setView(this._cityCoords, this._city.location.zoom);
    this._markerGroup.clearLayers();
    const icon = this._icon;
    const iconActive = this._iconActive;
    const activeCardId = this.props.activeCardId;

    this.props.points.forEach((card) => {
      if (card.id === activeCardId) {
        L.marker([card.location.latitude, card.location.longitude], {
          icon: iconActive,
          title: card.title,
          alt: card.title,
          zIndexOffset: 1,
        }).addTo(this._markerGroup);
      } else {
        L.marker([card.location.latitude, card.location.longitude], {
          icon,
          title: card.title,
          alt: card.title,
        }).addTo(this._markerGroup);
      }
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

}

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  children: PropTypes.node.isRequired,
  activeCardId: PropTypes.number.isRequired,
};

export {Map};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCardId: state.activeCard,
  points: getOffersToShow(state),
});

export default connect(mapStateToProps, null)(Map);
