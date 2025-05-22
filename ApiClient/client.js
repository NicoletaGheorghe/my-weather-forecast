import axios from "axios";
const geo_base_url = "https://geocoding-api.open-meteo.com/v1/search";
const weather_base_url = "https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,precipitation_probability_mean,weather_code&hourly=temperature_2m&current=temperature_2m&forecast_days=7";
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
    // Get matching locations by name
    async getLocation({ location } = {}) {
        if (!location) throw new Error("Location is required");
        const params = { name: location, count: 1 };
        return this.getRequest(geo_base_url, params);
    }
    // Get weather data for a location (lat/lon)
    async getWeather({ latitude, longitude }) {
        const params = {
            latitude,
            longitude,
            current: "temperature",
            hourly: "temperature_2m",
            daily: "temperature_2m_min,temperature_2m_max,uv_index_max,wind_speed_10m_max,weathercode,precipitation_probability_mean",
            forecast_days: "7",
        };
        return this.getRequest(weather_base_url, params);
    }
}