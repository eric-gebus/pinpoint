import { useEffect, useState } from "react";
import apiService from "../apiService";
import sun from "../assets/weather_icons/sun.png";
import cloudy from "../assets/weather_icons/partial_cloud.png";
import overcast from "../assets/weather_icons/cloudy.png";
import fog from "../assets/weather_icons/fog.png";
import light_rain from "../assets/weather_icons/rain.png";
import rain from "../assets/weather_icons/moderate_rain.png";
import heavy_rain from "../assets/weather_icons/heavy-rain.png";
import snow from "../assets/weather_icons/snowflake.png";
import thunder from "../assets/weather_icons/thunderstorm.png";

interface WeatherProps {
  position: [number, number];
}

interface WeatherData {
  hourly: {
    time: Date[];
    temperature2m: number[];
    weatherCode: number[];
    precipitationProbability: number[];
  };
}

function Weather({ position }: WeatherProps) {
  const [hourlyTimes, setHourlyTimes] = useState<Date[]>([]);
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [weatherCodes, setWeatherCodes] = useState<number[]>([]);
  const [precipitationsProb, setPrecipitationProb] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  function getWeatherIcon(code: number) {
    const icons: { [key: number]: string } = {
      0: sun,
      1: cloudy,
      2: cloudy,
      3: overcast,
      45: fog,
      48: fog,
      51: light_rain,
      53: light_rain,
      55: rain,
      56: rain,
      57: heavy_rain,
      61: rain,
      63: heavy_rain,
      65: heavy_rain,
      66: rain,
      67: heavy_rain,
      71: snow,
      73: snow,
      75: snow,
      77: snow,
      80: rain,
      81: rain,
      82: rain,
      85: snow,
      86: snow,
      95: thunder,
      96: thunder,
      99: thunder,
    };
    return icons[code] || sun;
  }

  function formatHourlyTime(date: Date): string {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      hour12: true
    }).replace(/\s/g, '').toLowerCase();
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const responses = await apiService.weatherAPI(position);
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly()!;

        const weatherData: WeatherData = {
          hourly: {
            time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
              (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
            weatherCode: Array.from(hourly.variables(1)!.valuesArray()!),
            precipitationProbability: Array.from(hourly.variables(2)!.valuesArray()!),
          },
        };
        //AI >>>>>
         const now = new Date();
         const currentHour = new Date(now);
         currentHour.setMinutes(0, 0, 0);

         const startIndex = weatherData.hourly.time.findIndex(time =>
           time.getTime() >= currentHour.getTime()
         );

         if (startIndex >= 0) {
           const endIndex = Math.min(startIndex + 6, weatherData.hourly.time.length);
           setHourlyTimes(weatherData.hourly.time.slice(startIndex, endIndex));
           setTemperatures(weatherData.hourly.temperature2m.slice(startIndex, endIndex));
           setWeatherCodes(weatherData.hourly.weatherCode.slice(startIndex, endIndex));
           setPrecipitationProb(weatherData.hourly.precipitationProbability.slice(startIndex, endIndex));
         }

        //<<<<< AI

       } catch (error) {
         console.error('Error in fetchWeather', error);
       } finally {
         setLoading(false);
       }
     };

     fetchWeather();
   }, [position]);

  if (loading) {
    return <div className="weather-container">Loading weather data...</div>;
  }

  return (
    <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow-md max-w-full overflow-x-auto">
    <h3 className="text-lg font-semibold mb-3 text-center">Weather Forecast</h3>
    <div className="flex space-x-6 pb-2">
      {hourlyTimes.map((time, index) => (
        <div key={index} className="flex flex-col items-center min-w-[60px]">
          <div className="font-bold mb-1">
            {index === 0 ? 'Now' : formatHourlyTime(time)}
          </div>
          <div className="mb-1">
            <img
              src={getWeatherIcon(weatherCodes[index])}
              className="w-10 h-10"
            />
          </div>
          <div className="text-lg font-medium mb-1">
            {Math.round(temperatures[index])}°C
          </div>
          <div className="text-sm text-blue-600">
            {precipitationsProb[index]}%
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Weather;