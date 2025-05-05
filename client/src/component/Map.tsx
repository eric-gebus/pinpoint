import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface MapProps {
  position: [number, number];
}

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

function Map({ position }: MapProps) {
  const {MAP_KEY}=process.env;
  console.log(MAP_KEY);

  function ChangeView({ center, zoom }: ChangeViewProps) {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, zoom, {
          duration: 1,
          easeLinearity: 0.25,
        });
      }
    }, [center, zoom, map]);
    return null;
  }

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ minHeight: "600px", minWidth: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={position} zoom={18} />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default Map;
