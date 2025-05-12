import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import Pin from "./Pin";
import { useEffect, useState } from "react";
import apiService from "../apiService";
import { useDebounce } from 'use-debounce';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


interface MapProps {
  position: [number, number];
  eventList: Event[];
  getPositionAndEvents: () => Promise<void>;
  mapZoom: number;
  mapCenter: [number, number];
  setMapZoom: (arg: number) => void;
  setMapCenter: (arg: [number, number]) => void;
  isLoadingEvents: boolean;
  setPosition: (position: [number, number]) => void
}

const MAP_KEY = import.meta.env.VITE_MAP_KEY;

function Map({
  position,
  getPositionAndEvents,
  eventList,
  mapZoom,
  mapCenter,
  setMapZoom,
  setMapCenter,
  isLoadingEvents,
  setPosition
}: MapProps) {

  const [hasClicked, setHasClicked] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  let searchCoord: [number, number]= [0, 0];
  let map: LeafletMap;
  let zoom: number;
  let center: [number, number];

  function ChangeView() {

    map = useMap();

    useEffect(() => {
      map.whenReady(() => {

        const mapCenter = map.getCenter();
        if (mapCenter.lat === 51.505) {
          map.setView(position, mapZoom, {
            duration: 1,
            easeLinearity: 0.25,
          });
        }

        map.on("zoom", ({ target }) => {
          zoom = target.getZoom();
        });

        map.on("moveend", ({ target }) => {
          const mapCenter = target.getCenter();
          center = [mapCenter.lat, mapCenter.lng];
        });

      });

      return () => {
        if (zoom) setMapZoom(zoom);
        if (center) setMapCenter(center);
      };
    }, []);

    return null;
  }

  async function onGetPositionClick() {
    await getPositionAndEvents();
    map.setView(position, mapZoom, {
      duration: 1,
      easeLinearity: 0.25,
    });
    setHasClicked(true);
  }


  async function handleSearch() {
    const results = await apiService.searchAddress(search)
    const searchLat = parseFloat(results[0].lat);
    const searchLong = parseFloat(results[0].lon);
    searchCoord = [searchLat, searchLong]
    setPosition(searchCoord)

    map.setView(position, mapZoom, {
      duration: 1,
      easeLinearity: 0.25,
    });

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
          <input type="search" required placeholder="Search" onChange={e => setSearch(e.target.value)} />
        </label>
          <button onClick={handleSearch}>Click me</button>

      </div>
      <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Select a Date:</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd MMM, yyyy"
            className="rounded-[16px] bg-gradient-to-b from-stone-300/40 to-transparent p-2"
          />
        </div>
      {/* map-container */}
      <div className="basis-full relative">
        <div className="m-3 overflow-hidden rounded-xl shadow-lg/50 relative">
          {
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={true}
              style={{ height: "55vh", width: "100vw", zIndex: 0 }}
              
            >
              <TileLayer
                url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAP_KEY}`}
                tileSize={512}
                zoomOffset={-1}
                minZoom={1}
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              />
              <ChangeView/>
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
              onClick={onGetPositionClick}
            >
              <img src="gps.png" alt="Get Position" className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>
      {
      (eventList.length == 0 && hasClicked === true && isLoadingEvents === false) &&
      <h1 className="justify-self-center bg-white divide-x rounded-lg shadow-lg/50 p-2 m-5 text-lg font-small">No available events in your area</h1>
      }
    </>
  );
}

export default Map;


