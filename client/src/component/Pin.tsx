
import {Marker, Popup} from "react-leaflet";


interface PinProps{
    position:[number, number];
}

function Pin({position}:PinProps) {

  return (
    <>
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
    </>
  );
}

export default Pin;
