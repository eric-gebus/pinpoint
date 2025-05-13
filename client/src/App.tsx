import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Navbar.tsx";
import List from "./component/List.tsx";
import apiService from "./apiService.tsx";
import Weather from "./component/Weather.tsx";
import Favorites from "./component/Favorites.tsx";
import Map from "./component/Map.tsx";


interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

enum Category {
  Events,
  Restaurants
}

function App() {
  const defaultPosition: [number, number] = [51.505, -0.09];
  const [position, setPosition] = useState<[number, number]>();
  const [eventList, setEventList] = useState<Event[]>([]);
  const [mapZoom, setMapZoom] = useState<number>(11);
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultPosition);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [favoriteEvents,setFavoriteEvents]=useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Events);
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);


  const options: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (!position) return;
    (async () => {
      setIsLoadingEvents(true);
      try {
        const events = await apiService.searchEvent(position, selectedDate);
        setEventList(events);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventList([]);
      }
      try {
          const restaurants = await apiService.getRestaurants(position);
          setRestaurantList(restaurants);
          console.log('nearby restaurants: ', restaurants);
      } catch (error) {
          console.error("Error fetching restaurants:", error);
          setRestaurantList([]);
      } finally {
        setIsLoadingEvents(false);
      }
    })();
  }, [position, selectedDate]);

  useEffect(()=>{
    (async ()=>{
      const savedFavoriteEvents=await apiService.getFavoriteEvents();
      console.log("fav events from pin: ",savedFavoriteEvents);
      setFavoriteEvents(savedFavoriteEvents);
    })()
  },[])



  function toggleFavorite(event:Event){
    console.log("fav clicked");
    const updatedEvent = { ...event };
    if(!favoriteEvents.some(fav => fav.id === updatedEvent.id)){
      event.isFavorite=true;
      apiService.favoriteEvent(event);
      setFavoriteEvents([...favoriteEvents,event]);
    }else{
      event.isFavorite=false;
      apiService.removeFavoriteEvent(event);
      const updatedFavoriteList=favoriteEvents.filter((favEvent)=>{
        return favEvent.id !==event.id
      })
      setFavoriteEvents(updatedFavoriteList);
    }
  }


  async function getPositionAndEvents() {
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

      const crd = pos.coords;

      setPosition([crd.latitude, crd.longitude]);

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.warn(`ERROR: ${err.message}`);
      } else {
        console.warn("Unknown error occurred", err);
      }
    }
  }

  useEffect(() => {
    getPositionAndEvents();
  }, []);

  return (
    <>
      <Router>
        <Weather position={position ? position : defaultPosition} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route
            path="/map"
            element={
              <Map
                eventList={eventList}
                restaurantList={restaurantList}
                position={position ? position : defaultPosition}
                getPositionAndEvents={getPositionAndEvents}
                mapZoom={mapZoom}
                mapCenter={mapCenter}
                setMapZoom={setMapZoom}
                setMapCenter={setMapCenter}
                isLoadingEvents={isLoadingEvents}
                setPosition={setPosition}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                favoriteEvents={favoriteEvents}
                toggleFavorite={toggleFavorite}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            }
          />
          <Route path="/list" element={<List eventList={eventList} favEvents={favoriteEvents} toggleFavorite={toggleFavorite} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
export { Category };