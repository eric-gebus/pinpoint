import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import marker from '../assets/map.png';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';


const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [36,40],
    shadowSize:[50, 64],
    
});

interface PinProps{
    position:[number, number];
    eventList:Event[]
}

function Pin({position,eventList}:PinProps) {

  return (
    <>
      <MarkerClusterGroup>
        {
            eventList.map((event:Event)=>{
                // console.log('event: ',event);
                const latitude=Number(event._embedded.venues[0].location.latitude);
                const longitude=Number(event._embedded.venues[0].location.longitude);
                // console.log('event latitude: ',latitude);
                // console.log('event longitude: ',longitude);
                const eventPosition:[number,number]=[latitude,longitude];
                return <Marker key={event.id} position={eventPosition}>
                    <Popup>
                      <>
                          <img src={event.images[0].url} alt="" />
                          <h1 className="m-1"> <b>{event.name}</b></h1>
                          <h5 className="m-1">{event._embedded.venues[0].address? event._embedded.venues[0].address.line1:""}</h5>
                          <h5 className="m-1">{event.distance} km away</h5>
                          <h4 className="text-l font-light m-1 text-blue-600 cursor-pointer hover:underline" onClick={() => window.open(event.url)}>Book now</h4>
                      </>
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
