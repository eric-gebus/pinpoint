import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import marker from '../assets/icon_isolated.png';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import RestaurantMarker from "./RestaurantMarker";


const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [30,42],
    shadowSize:[50, 64],

});

interface PinProps{
    position:[number, number];
    restaurantList: Restaurant[];
}

function RestaurantPin({ position, restaurantList }: PinProps) {

  return (
    <>
      <MarkerClusterGroup>
        {
            restaurantList.map((restaurant: Restaurant) => {
                return (
                  <RestaurantMarker key={restaurant.id} restaurant={restaurant}/>
                );
            })
        }
      </MarkerClusterGroup>
        {
          restaurantList.length>=0&&
          <Marker position={position} icon={myIcon}>
              <Popup>
                You are here! <br />
              </Popup>
          </Marker>
        }
    </>
  );
}

export default RestaurantPin;
