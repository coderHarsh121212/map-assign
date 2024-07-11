import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const getColor = (usage) => {
    if (usage > 5000) return "red";
    if (usage > 1000) return "orange";
    if (usage > 500) return "yellow";
    return "#c6dbef";
  };

  const getRadius = (usage) => {
    if (usage > 5000) return 200000;
    if (usage > 1000) return 150000;
    if (usage > 500) return 100000;
    return 50000;
  };

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((item, index) => (
        <Circle
          key={index}
          center={[item.lat, item.lng]}
          color={getColor(item.data)}
          fillColor={getColor(item.data)}
          fillOpacity={0.9}
          radius={getRadius(item.data)}
        >
          <Popup>
            <strong>Region:</strong> {item.region}<br />
            <strong>Data Usage:</strong> ${item.data}
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default Map;
