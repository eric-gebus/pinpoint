import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Pin from "./Pin";

interface MapProps {
  position: [number, number];
  eventList: Event[];
  getPositionAndEvents: () => void;
  mapZoom: number;
  setMapZoom: (arg: number) => void;
}

interface ChangeViewProps {
  center: [number, number];
}

const MAP_KEY = import.meta.env.VITE_MAP_KEY;

function Map({
  position,
  getPositionAndEvents,
  eventList,
  mapZoom,
  setMapZoom,
}: MapProps) {
  function ChangeView({ center }: ChangeViewProps) {
    const map = useMap();
    const mapCenter = map.getCenter();
    if (mapCenter.lat === 51.505) {
      console.log("set");
      map.setView(center, mapZoom, {
        duration: 1,
        easeLinearity: 0.25,
      });
    }
    map.addEventListener("zoom", ({ target }) => setMapZoom(target._zoom));
    map.setView(map.getCenter(), mapZoom, {
      duration: 1,
      easeLinearity: 0.25,
    });
    return null;
  }

  return (
    <>
      {/* search-nav-container */}
      <div className="flex place-content-between p-2 ">
        {/* search-input 
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
        */}
      </div>
      {/* map-container */}
      <div className="basis-full relative">
        <div className="m-3 overflow-hidden rounded-xl shadow-lg/50 relative">
          {
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "55vh", width: "100vw" }}
            >
              <TileLayer
                url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAP_KEY}`}
                tileSize={512}
                zoomOffset={-1}
                minZoom={1}
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              />
              <ChangeView center={position} />
              <Pin position={position} eventList={eventList} />
            </MapContainer>
          }
          {/* Button container */}
          <div
            className="absolute bottom-4 right-1 p-[4px] rounded-[16px]"
            style={{ zIndex: 1000 }}
          >
            <button
              className="group p-[4px] rounded-[12px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
              onClick={getPositionAndEvents}
            >
              <img src="gps.png" alt="Get Position" className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;
