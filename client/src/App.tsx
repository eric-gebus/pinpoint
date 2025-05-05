import { useState } from "react";
import "./App.css";
import Map from "./component/Map.tsx";

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface GeolocationError {
  readonly code: number;
  readonly message: string;
}

function App() {
  const defaultPosition: [number, number] = [51.505, -0.09];
  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  const options: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    setPosition([crd.latitude, crd.longitude]);
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err: GeolocationError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <>
      {/* search-nav-container */}
      <div className="flex place-content-between p-2 ">
        {/* search-input */}
        <label className="flex items-center">
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
            onClick={getLocation}
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
          <Map position={position} />
        </div>
      </div>
    </>
  );
}

export default App;
