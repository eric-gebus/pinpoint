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
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json()


    } catch (error) {
      console.log('Error in searchAddress', error)
      throw error
    }
  }

}