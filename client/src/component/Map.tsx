import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface MapProps {
  position: [number, number];
  getPositionAndEvents: () => void;
}

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

function Map({ position, getPositionAndEvents }: MapProps) {
  const MAP_KEY = import.meta.env.VITE_MAP_KEY;

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
      {/* search-nav-container */}
      <div className="flex place-content-between p-2 ">
        {/* search-input */}
        <label className="flex items-center bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
          <svg
            className="h-[1em] mr-2 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
        {/* button-container */}
        <div className="bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
          <button
            className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
            onClick={getPositionAndEvents}
          >
            <div className="bg-gradient-to-b from-stone-200/40 to-white/80 rounded-[8px] px-2 py-2">
              <div className="flex gap-2 items-center">
                <span className="font-semibold">Get my position</span>
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* map-container */}
      <div className="basis-full">
        <div className="m-3 overflow-hidden rounded-xl shadow-lg/50">
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
        </div>
      </div>
    </>
  );
}

export default Map;
