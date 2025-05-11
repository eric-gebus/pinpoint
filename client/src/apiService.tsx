import { fetchWeatherApi } from 'openmeteo';

export default {

  searchEvent: async function (position: [number, number]) {
    try {
      const response = await fetch('http://localhost:3000/events/search', { //TO UPDATE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: position[0],
          longitude:position[1]
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

  favoriteEvent:async function(event:Event){
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

  removeFavoriteEvent:async function(event:Event){
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
  getFavoriteEvents:async function(){
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

  }



}