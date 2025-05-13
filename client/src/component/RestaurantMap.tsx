import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";
import apiService from "../apiService";
import CategoryDropdown from "./CategoryDropdown";
import { Category } from "../App";
import RestaurantPin from "./RestaurantPin";

interface MapProps {
  position: [number, number];
  restaurantList: Restaurant[];
  getPositionAndEvents: () => Promise<void>;
  mapZoom: number;
  mapCenter: [number, number];
  setMapZoom: (arg: number) => void;
  setMapCenter: (arg: [number, number]) => void;
  isLoadingEvents: boolean;
  setPosition: (position: [number, number]) => void;
  setSelectedDate: (selectedDate: Date) => void;
  selectedDate: Date;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
}

const MAP_KEY = import.meta.env.VITE_MAP_KEY;

function RestaurantMap({
  position,
  getPositionAndEvents,
  restaurantList,
  mapZoom,
  mapCenter,
  setMapZoom,
  setMapCenter,
  isLoadingEvents,
  setPosition,
  setSelectedDate,
  selectedDate,
  setSelectedCategory
}: MapProps) {
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState<Date>(selectedDate);
  const [userHasMoved, setUserHasMoved] = useState<boolean>(false)
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
          setUserHasMoved(true)
        }
      };

      const onZoom = () => {
        setMapZoom(map.getZoom());
        setUserHasMoved(true)
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
    if (mapRef.current && !userHasMoved) {
      mapRef.current.setView(position, mapZoom);
    }
  }, [position, mapZoom, userHasMoved]);

  async function onGetPositionClick() {
    await getPositionAndEvents();
    setUserHasMoved(false);
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

        setUserHasMoved(false);
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
        <button className="rounded-[16px] bg-white p-2" onClick={handleSearch}>
          Explore
        </button>
      </div>
      {/* Category Dropdown */}
      <CategoryDropdown setSelectedCategory={setSelectedCategory}/>
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
              <RestaurantPin position={position} restaurantList={restaurantList}/>
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
      {restaurantList.length == 0 &&
        hasClicked === true &&
        isLoadingEvents === false && (
          <h1 className="justify-self-center bg-white divide-x rounded-lg shadow-lg/50 p-2 m-5 text-lg font-small">
            No available events in your area
          </h1>
        )}
    </>
  );
}

export default RestaurantMap;
