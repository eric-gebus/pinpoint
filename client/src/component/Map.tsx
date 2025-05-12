import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import Pin from "./Pin";
import { useEffect, useRef, useState } from "react";
import apiService from "../apiService";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface MapProps {
  position: [number, number];
  eventList: Event[];
  getPositionAndEvents: () => Promise<void>;
  mapZoom: number;
  mapCenter: [number, number];
  setMapZoom: (arg: number) => void;
  favoriteEvents:Event[];
  toggleFavorite: (event:Event) => void
  setMapCenter: (arg: [number, number]) => void;
  isLoadingEvents: boolean;
  setPosition: (position: [number, number]) => void;
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
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
  setPosition,
  setSelectedDate,
  selectedDate,
  favoriteEvents,
  toggleFavorite
}: MapProps) {
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState<Date>(selectedDate);
  const mapRef = useRef<LeafletMap>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function ChangeView() {
    const map = useMap();

    useEffect(() => {
      mapRef.current = map;

      const onMove = () => {
        const center = map.getCenter();
        if (
          Math.abs(center.lat - mapCenter[0]) > 0.0001 ||
          Math.abs(center.lng - mapCenter[1]) > 0.0001
        ) {
          setMapCenter([center.lat, center.lng]);
        }
      };

      const onZoom = () => {
        setMapZoom(map.getZoom());
      };

      map.on("moveend", onMove);
      map.on("zoomend", onZoom);

      return () => {
        map.off("moveend", onMove);
        map.off("zoomend", onZoom);
      };
    }, [map]);

    return null;
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, mapZoom);
    }
  }, [position, mapZoom]);

  async function onGetPositionClick() {
    await getPositionAndEvents();
    if (mapRef.current) {
      mapRef.current.setView(position, mapZoom);
    }
    setHasClicked(true);
  }

  const handleSearch = () => {
    const searchValue = searchInputRef.current?.value.trim();
    if (!searchValue) return;

    apiService
      .searchAddress(searchValue)
      .then((results) => {
        const searchLat = parseFloat(results[0].lat);
        const searchLong = parseFloat(results[0].lon);
        const searchCoord: [number, number] = [searchLat, searchLong];
        if (position[0] !== searchCoord[0] || position[1] !== searchCoord[1]) {
          setPosition(searchCoord);
        }

        mapRef.current?.setView(searchCoord, mapZoom, {
          duration: 1,
          easeLinearity: 0.25,
        });

        setSelectedDate(datePicker);
      })
      .catch(console.error);
  };

  return (
    <>
      {/* search-nav-container */}
      <div className="flex place-content-between p-2 ">
        {/* search-input */}
        <label className="flex items-center bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
          <input
            type="search"
            required
            placeholder="Search"
            ref={searchInputRef}
            defaultValue=""
            className="pl-2"
          />
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
        </label>
        {/* calendar */}
        <div className="flex">
          <div className="relative position-absolute top-2 left-46">
            <img src="calendar.svg" width={20} />
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              if (date) {
                setDatePicker(date);
              }
            }}
            dateFormat="dd MMM, yyyy"
            calendarStartDay={1}
            className="rounded-[16px] bg-gradient-to-b from-stone-300/40 to-transparent p-2 ml-2"
          />
        </div>
        <button className="rounded-[16px] bg-white p-2" onClick={handleSearch}>
          Explore
        </button>
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
              <Pin position={position} eventList={eventList} favoriteEvents={favoriteEvents} toggleFavorite={toggleFavorite} />
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
      {eventList.length == 0 &&
        hasClicked === true &&
        isLoadingEvents === false && (
          <h1 className="justify-self-center bg-white divide-x rounded-lg shadow-lg/50 p-2 m-5 text-lg font-small">
            No available events in your area
          </h1>
        )}
    </>
  );
}

export default Map;
