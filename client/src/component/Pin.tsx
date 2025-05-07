import {Marker, Popup} from "react-leaflet";
import { Event } from "../eventType";

interface PinProps{
    position:[number, number];
    eventList:Event[]
}

function Pin({position,eventList}:PinProps) {

  return (
    <>
        {
            eventList.map((event:Event)=>{
                console.log('event: ',event);
                const latitude=Number(event._embedded.venues[0].location.latitude);
                const longitude=Number(event._embedded.venues[0].location.longitude);
                console.log('event latitude: ',latitude);
                console.log('event longitude: ',longitude);
                const eventPosition:[number,number]=[latitude,longitude];
                return <Marker key={event.id} position={eventPosition}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>



            })
        }
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    </>
  );
}

export default Pin;
