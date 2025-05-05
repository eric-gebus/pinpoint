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
  const MAP_KEY = import.meta.env.VITE_MAP_KEY;
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
        url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAP_KEY}`}
        tileSize={512}
        zoomOffset={-1}
        minZoom={1}
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
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
