import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import marker from '../assets/map.png';

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
                    <h1> <b>{event.name}</b></h1>
                    <h5>{event._embedded.venues[0].address.line1}</h5>
                    <h5>{event.distance} km away</h5>
                    <a href={event.url}>Book now</a>
                  </>
                </Popup>
              </Marker>

            })
        }
        {      
           eventList.length>0&&<Marker position={position} icon={myIcon}>
                <Popup>
                    Your location <br /> 
                </Popup>
            </Marker>
        }
    </>
  );
}

export default Pin;
