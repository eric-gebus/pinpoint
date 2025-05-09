import { useEffect, useState } from "react";
import apiService from "../apiService";
import sun from "../assets/weather_icons/sun.png";
import cloudy from "../assets/weather_icons/cloudy.png";
import overcast from "../assets/weather_icons/overcast.png";
import fog from "../assets/weather_icons/fog.png";
import light_rain from "../assets/weather_icons/light_rain.png";
import rain from "../assets/weather_icons/rain.png";
import heavy_rain from "../assets/weather_icons/heavy_rain.png";
import snow from "../assets/weather_icons/snow.png";
import thunder from "../assets/weather_icons/thunder.png";
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'

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

interface HourlyWeather {
    time: Date;
    temperature: number;
    weatherCode: number;
    precipitationProbability: number;
}

function Weather({ position }: WeatherProps) {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([])

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

  function getWeatherIcon(code: number) {
    return icons[code] || sun;
  }

  function formatHourlyTime(date: Date): string {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      hour12: true
    }).replace(/\s/g, '').toLowerCase();
  }

  // function getVariableData(hourly: any, index: number): number[] {
  //   return Array.from(hourly.variables(index)!.valuesArray()!)
  // }


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await apiService.weatherAPI(position);
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hour = response.hourly()!;

        console.log(hour)


        const weatherData: WeatherData = {
          hourly: {
            time: [...Array((Number(hour.timeEnd()) - Number(hour.time())) / hour.interval())].map(
              (_, i) => new Date((Number(hour.time()) + i * hour.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: Array.from(hour.variables(0)!.valuesArray()!),
            weatherCode: Array.from(hour.variables(1)!.valuesArray()!),
            precipitationProbability: Array.from(hour.variables(2)!.valuesArray()!),
          },
        };


        // const weatherData: WeatherData = {
        //   hourly: {
        //     time: [...Array((Number(hour.timeEnd()) - Number(hour.time())) / hour.interval())].map(
        //       (_, i) => new Date((Number(hour.time()) + i * hour.interval() + utcOffsetSeconds) * 1000)
        //     ),
        //     temperature2m: getVariableData(hour, 0),
        //     weatherCode: getVariableData(hour, 1),
        //     precipitationProbability: getVariableData(hour, 2),
        //   },
        // };

        //AI >>>>>
         const now = new Date();
         const currentHour = new Date(now);
         currentHour.setMinutes(0, 0, 0);

         const startIndex = weatherData.hourly.time.findIndex(time =>
           time.getTime() >= currentHour.getTime()
         );

         if (startIndex >= 0) {
          const endIndex = Math.min(startIndex + 24, weatherData.hourly.time.length);
          const slicedData = weatherData.hourly.time
            .slice(startIndex, endIndex)
            .map((time, i) => ({
              time,
              temperature: weatherData.hourly.temperature2m[startIndex + i],
              weatherCode: weatherData.hourly.weatherCode[startIndex + i],
              precipitationProbability: weatherData.hourly.precipitationProbability[startIndex + i],
            }));
          setHourlyWeather(slicedData);
        }
      } catch (error) {
        console.error('Error in fetchWeather', error);
      }
    };

     fetchWeather();
   }, [position]);

   function slideLeft() {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft -= 500;
    }
  }

  function slideRight() {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += 500;
    }
  }

  return (
    <div className="bg-white bg-opacity-80 rounded-lg p-4 shadow-md shadow-xl max-w-full">
    <div className='relative flex items-center'>
      <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideLeft} size={40} />
      <div id ='slider' className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar">
        <div className="flex space-x-6 pb-2">
          {hourlyWeather.map((time, index) => (
            <div key={index} className="flex flex-col items-center min-w-[60px]">
              <div className="font-bold mb-1">
                {index === 0 ? 'Now' : formatHourlyTime(time.time)}
              </div>
              <div className="mb-1">
                <img
                  src={getWeatherIcon(time.weatherCode)}
                  className="w-10 h-10"
                />
              </div>
              <div className="text-lg font-medium mb-1">
                {Math.round(time.temperature)}°C
              </div>
              <div className="text-sm text-blue-600">
                {time.precipitationProbability}%
              </div>
            </div>
          ))}
        </div>
      </div>
      <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" onClick={slideRight} size={40} />
    </div>
    </div>
);
}

export default Weather;