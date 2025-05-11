import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import marker from '../assets/icon_isolated.png';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useState, useEffect} from "react";
import apiService from "../apiService";


const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [30,42],
    shadowSize:[50, 64],
    
});

interface PinProps{
    position:[number, number];
    eventList:Event[]
}

function Pin({position,eventList}:PinProps) {
  const [favoriteEvents,setFavoriteEvents]=useState<Event[]>([]);

  useEffect(()=>{
    (async ()=>{
      const favoriteEvents=await apiService.getFavoriteEvents();
      console.log("fav events from pin: ",favoriteEvents);
      setFavoriteEvents(favoriteEvents);
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
    // setFavoriteEvent(true);
  }

  return (
    <>
      <MarkerClusterGroup>
        {
            eventList.map((event:Event)=>{
                // console.log('event: ',event);
                event.isFavorite=false;
                const latitude=Number(event._embedded.venues[0].location.latitude);
                const longitude=Number(event._embedded.venues[0].location.longitude);
                // console.log('event latitude: ',latitude);
                // console.log('event longitude: ',longitude);
                const eventPosition:[number,number]=[latitude,longitude];
                return <Marker key={event.id} position={eventPosition}>
                    <Popup>
                      <div className="items-center">
                          <img src={event.images[0].url} alt="" />
                          <h1 className="m-1 text-center"> <b>{event.name}</b></h1>
                          <h5 className="m-1 text-center">{event._embedded.venues[0].address? event._embedded.venues[0].address.line1:""}</h5>
                          <h5 className="m-1 text-center">{event.distance} km away</h5>
                          <h4 className="text-l font-light m-1 text-blue-600 cursor-pointer text-center hover:underline" onClick={() => window.open(event.url)}>Book now</h4>
                          <img src={favoriteEvents.some(favevent=>event.id===favevent.id)?"filled_heart.png":"heart.png"} onClick={()=>toggleFavorite(event)} className="h-7 w-7 cursor-pointer object-center  mx-auto " alt="" />
                      </div>
                    </Popup>
                </Marker>
            })
        }
      </MarkerClusterGroup>
        {      
          eventList.length>0&&
          <Marker position={position} icon={myIcon}>
              <Popup>
                You are here! <br /> 
              </Popup>
          </Marker>
        }
    </>
  );
}

export default Pin;
