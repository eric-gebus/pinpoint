import { useEffect, useState } from "react";
import apiService from "../apiService";

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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
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
        setHourlyTimes(weatherData.hourly.time);
        setTemperatures(weatherData.hourly.temperature2m);
        setWeatherCodes(weatherData.hourly.weatherCode);
        setPrecipitationProb(weatherData.hourly.precipitationProbability);
        console.log(weatherData.hourly.temperature2m)

      } catch (error) {
        console.error('Error in fetchWeather', error);
      }
    };

    fetchWeather();
  }, [position]);

  return (

    <div className="weather-container">
    </div>
  );
}

export default Weather;