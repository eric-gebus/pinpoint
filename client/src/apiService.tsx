import { fetchWeatherApi } from 'openmeteo';

export default {

  searchEvent: async function (position: [number, number], date: Date) {
    try {
      const response = await fetch('http://localhost:3000/events/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: position[0],
          longitude:position[1],
          date: date
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json();
      // console.log("events from server: ",data);
      return data;

    } catch (error) {
      console.log('Error in searchEvent', error)
      throw error
    }
  },

  weatherAPI: async function (position: [number, number]) {
    try {
      const params = {
        "latitude": position[0],
        "longitude": position[1],
        "hourly": ["temperature_2m", "weather_code", "precipitation_probability"],
        "timezone": "auto",
      };
      const url = "https://api.open-meteo.com/v1/forecast";

      const responses = await fetchWeatherApi(url, params);
      
      return responses

    } catch (error) {
      console.log('Error in weatherAPI', error)
      throw error
    }
  },

  searchAddress: async function (query: string) {
    try {
      const params = {
        q: query,
        format: 'json',
        addressdetails: '1',
        limit: '1'
      };

      const url = new URL('https://nominatim.openstreetmap.org/search');
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const response = await fetch(url.toString(), {
        headers: {
          'User-Agent': 'PinPoints (ericgebus@gmail.com)'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();

    } catch (error) {
      console.log('Error in searchAddress', error)
      throw error
    }
  },


  favoriteEvent: async function(event:Event){
    console.log("from api service -favoritee event");
    console.log("event : ",event);
    try {
      const response = await fetch('http://localhost:3000/events/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:event.name,
          id:event.id,
          url:event.url,
          image:event.images[0].url,
          address:event._embedded.venues[0].address?.line1,
          distance:event._embedded.venues[0].distance,
          startDate:event.dates.start?.localDate
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json();
      console.log("favorite response: ",data);
      return data;

    } catch (error) {
      console.log('Error in favoriteEvent', error)
      throw error
    }
  },


  removeFavoriteEvent: async function(event:Event){
    console.log("api-remove favoritee event");
    try {
      const response = await fetch(`http://localhost:3000/events/removeFavoriteEvent/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {

        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json();
      console.log("delete fav response: ",data);
      return data;

    } catch (error) {
      console.log('Error in delete fav event', error)
      throw error
    }
  },


  getFavoriteEvents: async function(){
    console.log("from api service -favoritee event list");
    try {
      const response = await fetch('http://localhost:3000/events/favoriteEvents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json();
      console.log("favorite event list: ",data);
      return data;

    } catch (error) {
      console.log('Error in favoriteEvent list', error)
      throw error
    }
  },

  getRestaurants: async function (position: [number, number]) {
    const [latitude, longitude] = position;
    const query = `
    [out:json][timeout:25];
    (
      node["amenity"="restaurant"](around:20000,${latitude},${longitude});
      way["amenity"="restaurant"](around:20000,${latitude},${longitude});
      relation["amenity"="restaurant"](around:20000,${latitude},${longitude});
    );
    out center 500;
    `;

    const params = new URLSearchParams({ data: query });

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.elements.filter((restaurant: Restaurant) => {
      return (("lat" in restaurant) && ("lon" in restaurant) && ("tags" in restaurant) && ("name" in restaurant.tags));
    });
  }
}