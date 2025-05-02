import { useState } from 'react';
import './App.css'
import Map from './component/Map.tsx'


interface GeolocationOptions {
  enableHighAccuracy?: boolean,
  timeout?: number,
  maximumAge?: number,
}

interface GeolocationError {
  readonly code:number;
  readonly message: string;
}

function App() {
  const defaultPosition: [number, number] = [51.505, -0.09];
  const [position, setPosition] = useState<[number, number]>(defaultPosition)

  const options: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    setPosition([crd.latitude, crd.longitude])
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err: GeolocationError) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function getLocation () {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <>
    <button onClick={getLocation}>Click me!</button>
      <Map position={position}/>
    </>
  )
}

export default App
