import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import marker from '../assets/icon_isolated.png';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';


const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [30,42],
    shadowSize:[50, 64],

});

interface PinProps{
    position:[number, number];
    eventList:Event[];
    favoriteEvents:Event[];
    toggleFavorite: (event:Event) => void
}

function EventPin({position,eventList, favoriteEvents,toggleFavorite}:PinProps) {

  return (
    <>
      <MarkerClusterGroup>
        {
            eventList.map((event:Event)=>{
                event.isFavorite=false;
                const latitude=Number(event._embedded.venues[0].location.latitude);
                const longitude=Number(event._embedded.venues[0].location.longitude);
                const eventPosition:[number,number]=[latitude,longitude];
                return <Marker key={event.id} position={eventPosition}>
                    <Popup>
                      <div className="items-center">
                          <img src={event.images[0].url} alt="" />
                          <h1 className="m-1 text-center"> <b>{event.name}</b></h1>
                          <h5 className="m-1 text-center">{event._embedded.venues[0].address? event._embedded.venues[0].address.line1:""}</h5>
                          <h5 className="m-1 text-center">{event.distance} km away</h5>
                          <h4 className="text-l font-light m-1 text-blue-600 cursor-pointer text-center hover:underline" onClick={() => window.open(event.url)}>Book now</h4>
                          <img src={favoriteEvents.some(favEvent=>event.id===favEvent.id)?"filled_heart.png":"heart.png"} onClick={()=>toggleFavorite(event)} className="h-7 w-7 cursor-pointer object-center  mx-auto " alt="" />
                      </div>
                    </Popup>
                </Marker>
            })
        }
      </MarkerClusterGroup>
        {
          eventList.length>=0&&
          <Marker position={position} icon={myIcon}>
              <Popup>
                You are here! <br />
              </Popup>
          </Marker>
        }
    </>
  );
}

export default EventPin;
