import axios from "axios";
const geo_base_url = "https://geocoding-api.open-meteo.com/v1/search";
const weather_base_url = "https://api.open-meteo.com/v1/forecast";
export default class ApiClient {
    async responseStatusCheck(responseObject) {
        if (responseObject.status >= 200 && responseObject.status < 300) {
            return responseObject;
        }
        throw new Error(responseObject.statusText);
    }
    async getRequest(url, params = {}) {
        try {
            const response = await axios.get(url, { params });
            return this.responseStatusCheck(response);
        } catch (error) {
            throw new Error('Something went wrong. Mistakes happen.');
        }
    }
   
    async getLocation({ location } = {}) {
        if (!location) throw new Error("Location is required");
        const params = { name: location, count: 1 };
        return this.getRequest(geo_base_url, params);
    }
    
    async getWeather({ latitude, longitude, timezone }) {
        const today = new Date();
        const sevenDays= new Date();
        sevenDays.setDate(today.getDate() + 6);
        const format = (date) => date.toISOString().split("T")[0];
        const startDate = format(today);
        const endDate = format(sevenDays);
        const params = {
            latitude,
            longitude,
            current: "temperature",
            hourly: "temperature_2m,weathercode",
            daily: "temperature_2m_min,temperature_2m_max,uv_index_max,wind_speed_10m_max,weathercode,precipitation_probability_mean",
            timezone,
            start_date: startDate,
            end_date: endDate,
        };
        return this.getRequest(weather_base_url, params);
    }
}