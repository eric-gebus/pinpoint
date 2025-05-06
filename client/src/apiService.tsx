import { fetchWeatherApi } from 'openmeteo';

export default {

  searchEvent: async function (position: [number, number]) {
    try {
      const response = await fetch('http://localhost:3000/', { //TO UPDATE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coordinates: position
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }

      const data = await response.json();
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
        "forecast_days": 1
      };
      const url = "https://api.open-meteo.com/v1/forecast";

      const responses = await fetchWeatherApi(url, params);

      return responses

    } catch (error) {
      console.log('Error in weatherAPI', error)
      throw error
    }
  }


}