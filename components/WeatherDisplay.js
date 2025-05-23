import { useState, useEffect } from "react";
import { getIcon } from "./getIcon";
import { getCurrentHour, getNewHour } from "./getHourlyTemp";

export default function WeatherDisplay({
  loading,
  forecast,
  currentTemperature,
  hourly,
  timezone = "Europe/London",
}) {

  const [hourStartIndex, setHourStartIndex] = useState(0);
  const hoursToShow = 8; 
  const maxScrollableHours = 24;

  const today = new Date().toISOString().split("T")[0];
  const currentHourIndex = getCurrentHour(hourly, timezone);

  useEffect(() => {
    if (currentHourIndex !== -1) {
      setHourStartIndex(currentHourIndex); 
    }
  }, [currentHourIndex]);

  if (loading) return <div className="text-center">Loading...</div>;

  const isToday = (day) => day.date === today;

  const handleScroll = (direction) => {
    setHourStartIndex((prevIndex) => 
       getNewHour(prevIndex, direction, hourly.length, currentHourIndex, hoursToShow, maxScrollableHours)) 
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 w-full md:w-6/8 mx-auto mt-5">
      {forecast.map((day, index,) => {
        const showToday = isToday(day);
        const weather = getIcon(day.code);
        const dayHourly = hourly;
        const visibleHours = dayHourly.slice(hourStartIndex, hourStartIndex + hoursToShow);
        
        return (
          <div
            key={index}
            className={`${
              showToday ? "bg-gray-100/40 md:col-span-6" : "bg-gray-200/40"
            } p-4 rounded-lg shadow-md shadow-gray-600`}
          >
            <h3 className="font-bold text-2xl text-indigo-800 mb-1">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: showToday ? "long" : "short",
              })}
            </h3>
            <img
              src={weather.icon}
              alt={weather.label}
              title={weather.label}
              className={`${showToday? "w-22 h-20" : "w-15 h-13"} mb-2 place-self-center ` }
            />
            {showToday && currentTemperature !== null && (
              <p className="text-indigo-800 font-bold mb-2">
                {weather.label} &nbsp; {currentTemperature}°C
              </p>
            )}
            {showToday && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() => handleScroll(-1)}
                       disabled={hourStartIndex <= currentHourIndex}
                    className="p-1 bg-gray-400 text-white rounded disabled:bg-gray-500"
                  >
                    &#9668;
                  </button>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs">
                  {visibleHours.map(({ time, temp, code }, i) => {
                    const date = new Date(time);
                    const timeLabel = new Intl.DateTimeFormat("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: timezone,
                    });
                    const localTime = timeLabel.format(date);
                    const isCurrent = hourStartIndex + i === currentHourIndex;
                    const hourWeather = getIcon(code);
                    return (
                      <div
                        key={i}
                        className={`text-center p-2 rounded ${
                          isCurrent
                            ? "font-bold bg-gray-100/50 text-black"
                            : "bg-gray-100/50 text-black"
                        }`}
                      >
                        <p>{localTime}</p>
                        <img
                            src={hourWeather.icon}
                            alt={hourWeather.label}
                            title={hourWeather.label}
                            className={`w-10 h-8 mb-2 place-self-center`}
                          />
                        <p>{temp}°C</p>
                      </div>
                    );
                  })}
                </div>
                  <button
                    onClick={() => handleScroll(1)}
                    disabled={hourStartIndex + hoursToShow >= currentHourIndex + maxScrollableHours}
                    className="p-1 bg-gray-400 text-white rounded disabled:bg-gray-500"
                  >
                    &#9658;
                  </button>
                </div>
                
              </div>
            )}
            <div
              className={`grid ${
                showToday ? "grid-cols-2" : "grid-cols-1"
              } font-semibold text-zinc-700`}
            >
              <p className={`${showToday ? "text-md" : "text-xs"}`}>
                Min: {day.min}°C
              </p>
              <p className={`${showToday ? "text-md" : "text-xs"}`}>
                Max: {day.max}°C
              </p>
              <p className={`${showToday ? "text-md" : "text-xs"}`}>
                Precip: {day.precip}%
              </p>
              <p className={`${showToday ? "text-md" : "text-xs"}`}>UV: {day.uv}</p>
              <p className={`${showToday ? "text-md col-span-2" : "text-xs"}`}>
                Wind: {day.wind} km/h
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}