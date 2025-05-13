import { useRef } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

const RestaurantMarker = ({ restaurant }: { restaurant: Restaurant }) => {
  const markerRef = useRef<L.Marker | null>(null);
  const popupRef = useRef<L.Popup>(L.popup());

  const eventPosition: [number, number] = [restaurant.lat, restaurant.lon];

  return (
    <Marker
      position={eventPosition}
      ref={markerRef}
      eventHandlers={{
        click: async () => {
          try {
            const reverse = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${restaurant.lat}&lon=${restaurant.lon}&format=json`
            );
            const reverseJson = await reverse.json();

            const addressText = `
              <div class="items-center">
                <h1 class="m-1 text-center"><b>${restaurant.tags.name}</b></h1>
                <h5 class="m-1 text-center">
                  ${reverseJson.address.house_number || ""} ${reverseJson.address.road || ""}
                </h5>
              </div>
            `;

            popupRef.current.setContent(addressText);

            if (!markerRef.current) return;

            markerRef.current.bindPopup(popupRef.current);
            markerRef.current.openPopup();

          } catch (error) {
            console.error(error);
          }
        }
      }}
    />
  );
};

export default RestaurantMarker;