import React, {useState} from "react";
import PropTypes from "prop-types";

import L from "leaflet";
import {Map, Marker, TileLayer, LayersControl} from "react-leaflet";
import history from "../../browser-history/browser-history";

const simpleIcon = L.icon({
  iconUrl: `/img/pin.svg`
});

const activeIcon = L.icon({
  iconUrl: `/img/pin-active.svg`
});

const baseMap = (
  <TileLayer
    url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`}
    attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
  />
);
const hyddaMap = (
  <TileLayer
    url={`https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png`}
    attribution={`Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
  />
);

const MapComponent = ({config, activePointId}) => {
  // Не стал этот стейт прятать в HOC, т.к. реализовал такое поведение просто исходя из юзабилити в offerPage и это не входит в ТЗ
  const [scrollWheelZoom, setScrollWheelZoom] = useState(false);
  return (
    <Map
      center={config.center}
      zoom={config.zoom}
      style={{height: `100%`}}
      onZoom={()=>setScrollWheelZoom(true)}
      onMouseout={()=>setScrollWheelZoom(false)}
      scrollWheelZoom={scrollWheelZoom}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="BaseMap" checked>
          {baseMap}
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="HyddaMap">
          {hyddaMap}
        </LayersControl.BaseLayer>
      </LayersControl>
      {config.points.map((point) => {
        const {position, id} = point;
        return (
          <Marker
            icon={id === activePointId ? activeIcon : simpleIcon}
            position={position}
            key={id}
            onClick={() => {
              history.push(`/offer/${id}`);
            }}
          ></Marker>
        );
      })}
    </Map>
  );
};

MapComponent.propTypes = {
  config: PropTypes.object.isRequired,
  activePointId: PropTypes.number.isRequired
};

export default MapComponent;
