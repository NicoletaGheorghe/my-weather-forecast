"use client";
import { useState, useEffect } from "react";
import ApiClient from "../ApiClient/client";
import { getIcon } from "./getIcon";
import WeatherDisplay from "./WeatherDisplay";

export default function WeatherFetcher({onWeatherConditionChange}) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyTemperature, setHourlyTemperature] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [timezone, setTimezone] = useState("auto");

  const client = new ApiClient();

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const locationResponse = await client.getLocation({
        location: selectedLocation || "London",
      });
      const results = locationResponse.data.results;

      if (results && results.length > 0) {
        const first = results[0];
        const weatherRes = await client.getWeather({
          latitude: first.latitude,
          longitude: first.longitude,
          timezone: first.timezone,
        });
        const data = weatherRes.data;
        console.log("First hourly timestamp:", data.hourly.time[0]);
        console.log("Timezone in weather API response:", data.timezone);
        console.log("Resolved timezone:", first.timezone);
        const forecastArray = data.daily.time.map((date, index) => ({
          date,
          min: data.daily.temperature_2m_min[index],
          max: data.daily.temperature_2m_max[index],
          uv: data.daily.uv_index_max[index],
          wind: data.daily.wind_speed_10m_max[index],
          code: data.daily.weathercode[index],
          precip: data.daily.precipitation_probability_mean[index],
        }));
     
        setDailyForecast(forecastArray);
        
        setTimezone(first.timezone);
         const tz = data.timezone || first.timezone || 'Europe/Bucharest';

      const hourlyData = data.hourly.time.map((timeStr, i) => ({
        time: timeStr,
        temp: data.hourly.temperature_2m[i],
        code: data.hourly.weathercode[i],
      }));
    
      setHourlyTemperature(hourlyData);
        setCurrentTemperature(data.current.temperature_2m);
        setWeatherCondition(data.daily.weathercode[0]);
        
      if (onWeatherConditionChange) {
          onWeatherConditionChange(data.daily.weathercode[0]); 
      }
    }
    } catch (error) {
      console.error("API request error:", error.response?.data || error.message || error);
    throw new Error(error.response?.data?.reason || error.message || 'Something went wrong. Mistakes happen.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);
  

  return (
    <>
    <div className="flex flex-col">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex place-self-center bg-gray-100/40 rounded-md p-2 mb-5 shadow-md shadow-gray-600" >
            <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") fetchLocation(); }}
                placeholder="Enter city" 
                className="font-semibold text-zinc-700 outline-none"
            />
            <button onClick={fetchLocation} className="justify-self-end w-8">⌕</button>
         </div>
         <h2 className="text-xl font-bold">{(selectedLocation.trim() &&  selectedLocation
              .toLowerCase()
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")) || "London"}
          </h2>
      <WeatherDisplay
        loading={loading}
        forecast={dailyForecast}
        currentTemperature={currentTemperature}
        hourly={hourlyTemperature}
        timezone={timezone}
      />
      </div>
    </>
  );
}
