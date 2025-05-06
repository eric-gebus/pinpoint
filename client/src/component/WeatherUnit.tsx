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

function Weather({ hourlyTimes, temperatures, weatherCodes, precipitationsProb }: WeatherProps) {
  const [hourlyTimes, setHourlyTimes] = useState<Date[]>([]);
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [weatherCodes, setWeatherCodes] = useState<number[]>([]);
  const [precipitationsProb, setPrecipitationProb] = useState<number[]>([]);


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
  return icons[code] || '❓';
}




  return (
    <div className="weather-container">
    </div>
  );
}

export default Weather;

