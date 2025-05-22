import { getIcon } from "./getIcon";
export default function WeatherDisplay({
  loading,
  forecast,
  currentTemperature,
  hourly,
}) {
  const today = new Date().toISOString().split("T")[0];
  
 
  if (loading) return <div className="text-center">Loading...</div>;

  return (  
    <div className="grid grid-cols-1 md:grid-cols-6 gap-3 w-6/8 mx-auto  mt-5  ">
      {forecast.map((day, index) => {
        const isToday = day.date === today;
        const weather = getIcon(day.code);
        return (
          <div 
            key={index}
            className={`${isToday ? 'bg-white/80 md:col-span-6' : 'bg-gray-300/80'} p-4 rounded-lg shadow-md shadow-gray-600 `}
          >
            <h3 className="font-bold text-2xl text-indigo-800 mb-1">
              {new Date(day.date).toLocaleDateString(undefined,  { weekday: isToday? 'long' : 'short' } )}
            </h3>
            <img src={weather.icon} alt={weather.label} title={weather.label} className={`${isToday ? "w-22 h-20": "w-15 h-13"} mb-2 place-self-center`}/>
            {isToday && currentTemperature !== null && (
              <p className="text-indigo-800 font-bold mb-2">{weather.label} &nbsp;
                {currentTemperature}°C
              </p>
            )}
            {isToday && (
                <div className="grid grid-cols-12 gap-2 text-xs">
                   {hourly.map(({ time, temp }, i) => {
                      const date = new Date(time + ":00Z"); 
                      const timeLabel = date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <div key={i} className="text-center shadow-sm shadow-gray-200">
                          <p>{timeLabel}</p>
                          <p>{temp}°C</p>
                        </div>
                      );
                    })}
                </div>
            )}
            <div className={`grid ${isToday ? "grid-cols-2" : "grid-cols-1"} font-semibold text-zinc-700`}>
              <p className={`${isToday ? 'text-md' : 'text-xs'}`}>Min: {day.min}°C</p>
              <p className={`${isToday ? 'text-md' : 'text-xs'}`}>Max: {day.max}°C</p>
              <p className={`${isToday ? 'text-md' : 'text-xs'}`}>Precip: {day.precip}%</p>
              <p className={`${isToday ? 'text-md' : 'text-xs'}`}>UV: {day.uv}</p>
              <p className={`${isToday ? 'text-md' : 'text-xs'}`}>Wind: {day.wind} km/h</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
