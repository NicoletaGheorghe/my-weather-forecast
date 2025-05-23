"use client";
import { useState } from "react";
import { getIcon } from "../../components/getIcon";
import WeatherFetcher from "../../components/WeatherFetcher";

export default function Home() {
   const [weatherCondition, setWeatherCondition] = useState(null);
  const getWeatherStyles = (code) => {
    const weatherIcon = getIcon(code);
    return {
      background: weatherIcon.background || "bg-blue-500",
      textColor: weatherIcon.textColor || "text-white"
    };
    };
    const weatherStyles = getWeatherStyles(weatherCondition);
  return (
    <main className={`min-h-screen p-12 ${weatherStyles.background} ${weatherStyles.textColor}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className={`text-4xl md:text-5xl font-bold ${weatherStyles.textColor} text-shadow-md shadow-gray-500 mb-4`}>
         Weekly Weather Forecast
        </h1>
        <p className={`mb-4 ${weatherStyles.textColor}`}>
          Enter a location
        </p>
        <div className="grid grid-cols-1 w-7/8 mx-auto  mt-10"><WeatherFetcher onWeatherConditionChange={setWeatherCondition} />
          
        </div>
      </div>
    </main>
  );
}
