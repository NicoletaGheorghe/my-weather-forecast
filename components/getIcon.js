

export const getIcon = (code) => {
    if (code === 0) return {
        label: "Clear sky",
         icon: "/icons/sun.png",
        background: "bg-gradient-to-b from-yellow-200 via-yellow-400 to-orange-300",
        textColor: "text-gray-800"
    };
    if (code >=1 && code <=3) return {
        label: "Partly cloudy",
         icon: "/icons/partlyCloudy.png",
        background: "bg-gradient-to-b from-blue-100 via-gray-200 to-yellow-100",
        textColor: "text-gray-800",
    };
    if (code >= 45 && code <= 48) return {
        label: "Fog", 
        icon: "icons/cloudy.png",
        background: "bg-gradient-to-b from-gray-100 via-gray-300 to-gray-400",
        textColor: "text-gray-800",
    };
    if (code >= 66 && code <= 67) return {
        label: "Freezing rain",
         icon: "/icons/freezingRain.png",
         background: "bg-gradient-to-b from-blue-100 via-blue-200 to-gray-300",
         textColor: "text-gray-800",
        };
    if (code >= 51 && code <= 57) return {
        label: "Drizzle",
         icon: "/icons/rain.png",
        background: "bg-gradient-to-b from-gray-100 via-blue-200 to-gray-300",
        textColor: "text-gray-800",
        };
    if (code >= 61 && code <= 65) return {
        label:"Rain", 
        icon: "/icons/rain.png",
        background: "bg-gradient-to-b from-slate-300 via-blue-400 to-slate-600",
        textColor: "text-white",
    };
    if (code >= 71 && code <= 77) return {
        label: "Snow",
         icon: "/icons/snow.png",
         background: "bg-gradient-to-b from-white via-blue-100 to-slate-200",
         textColor: "text-gray-800",
        };
    if (code === 85 || code === 86) return {
        label: "Snow showers", 
        icon: "/icons/snow.png",
        background: "bg-gradient-to-b from-white via-blue-100 to-blue-300",
        textColor: "text-gray-800",
    };
    if (code >= 80 && code <= 82) return {
        label: "Rain showers",
         icon: "/icons/rain.png",
        background: "bg-gradient-to-b from-gray-100 via-blue-300 to-slate-400",
        textColor: "text-gray-800",
        };
    if (code >= 95 && code <= 99) return {
        label: "Thunderstorm", 
        icon: "/icons/storm.png",
        background: "bg-gradient-to-b from-gray-800 via-indigo-700 to-black",
        textColor: "text-white"
    };
  
    return {
        label: "Unknown",
        icon: "/icons/unknown.png",
        background: "bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700",
        textColor: "text-white"
    };
  }
  

